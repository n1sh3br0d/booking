import {DatabaseService} from "../database/database.service";
import {Injectable, Logger} from "@nestjs/common";
import {find} from 'lodash/fp';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);
  constructor(private db: DatabaseService) {
  }

  async run(): Promise<void> {
    await this.db.query(`CREATE TABLE IF NOT EXISTS migrations (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`);
    const migrations = [
      'create_cars_table',
      'create_clients_table',
      'create_bookings_table',
      'fill_cars_table',
      'fill_clients_table'
    ];
    
    const current = await this.db.query('SELECT * FROM migrations');
    
    for (const migration of migrations) {
      if (!find(m => m.name === migration, current.rows)) {
        const sql = require(`./migrations/${migration}`);
        this.logger.log(sql.default);
        await this.db.query(sql.default);
        await this.addMigration(migration);
      }
    }
  }

  private async addMigration(name: string): Promise<void> {
    await this.db.query(`INSERT INTO migrations(name) VALUES($1)`, [name]);
  }
}