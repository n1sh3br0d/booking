import {Inject, Injectable, Logger} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import databaseConfig from './database.config';
import {Pool, types} from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  private connection: Pool;

  constructor(
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>
  ) {
    this.connect();

    // data parsing
    types.setTypeParser(types.builtins.INT8, (value: string) => {
      return parseInt(value);
    });

    types.setTypeParser(types.builtins.FLOAT8, (value: string) => {
      return parseFloat(value);
    });

    types.setTypeParser(types.builtins.NUMERIC, (value: string) => {
      return parseFloat(value);
    });
  }

  private connect(): void {
    this.connection = new Pool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.username,
      password: this.config.password,
      database: this.config.dbName,
    });
  }

  async query(query: string, params?: unknown[]) {
    this.logger.verbose(query);
    this.logger.verbose(params);
    return this.connection.query(query, params);
  }
}
