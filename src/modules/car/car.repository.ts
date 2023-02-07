import {DatabaseService} from "../database/database.service";
import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../base/base.repository";
import {CarEntity} from "./car.entity";
import {map} from "lodash/fp";
import {plainToInstance} from "class-transformer";

@Injectable()
export class CarRepository extends BaseRepository<CarEntity> {
  constructor(db: DatabaseService) {
    super(db, 'cars', CarEntity);
  }

  async getFreeCars(startDate: Date, endDate: Date): Promise<CarEntity[]> {
    const endDate2 = new Date(endDate); 
    endDate2.setDate(endDate2.getDate() + 3);
    const result = await this.db.query(`SELECT * FROM ${this.tableName} 
      WHERE id NOT IN (SELECT car_id FROM bookings WHERE end_date <= $1 AND start_date >= $2)`, [endDate2, startDate]);
    return result.rows.length ? map((e) => plainToInstance(this.cls, e), result.rows) : [];
  }
}