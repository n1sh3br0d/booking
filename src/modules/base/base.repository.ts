import {DatabaseService} from "../database/database.service";
import {ClassConstructor, instanceToPlain, plainToInstance} from "class-transformer";
import {BaseEntity} from "./base.entity";
import {filter, map} from "lodash/fp";

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected db: DatabaseService, protected tableName: string, protected cls: ClassConstructor<T>) {
  }

  async create(body: T): Promise<T> {
    const obj = instanceToPlain(body);
    const keys = filter(k => k !== 'id', Object.keys(obj));
    const result = await this.db.query(`
      INSERT INTO ${this.tableName}(${keys.join(',')}) VALUES (${keys.map((_, i) => `$${i+1}`).join(',')}) RETURNING *`, 
      keys.map(k => obj[k]));
    return plainToInstance(this.cls, result.rows[0]);
  };

  async findById(id: number): Promise<T> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);
    return result.rows.length ? plainToInstance(this.cls, result.rows[0]) : null;
  }

  async findAll(): Promise<T[]> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return result.rows.length ? map((e) => plainToInstance(this.cls, e), result.rows) : [];
  }

  async removeById(id: number): Promise<void> {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }

}