import {DatabaseService} from "../database/database.service";
import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../base/base.repository";
import {BookingEntity} from "./booking.entity";
import {map} from "lodash/fp";
import {plainToInstance} from "class-transformer";

@Injectable()
export class BookingRepository extends BaseRepository<BookingEntity> {
  constructor(db: DatabaseService) {
    super(db, 'bookings', BookingEntity);
  }

  async getBetweenDates(firstDate: Date, lastDate: Date): Promise<BookingEntity[]> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE start_date BETWEEN $1 AND $2 OR end_date BETWEEN $1 AND $2`, [firstDate, lastDate]);
    return result.rows.length ? map((e) => plainToInstance(this.cls, e), result.rows) : []; 
  }
}