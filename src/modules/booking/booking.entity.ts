import {Exclude, Expose, Type} from "class-transformer";
import {BaseEntity} from "../base/base.entity";
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class BookingEntity extends BaseEntity {
  @ApiProperty({name: 'car_id'})
  @Expose({name: 'car_id'})
  carId: number;
  @ApiProperty({name: 'start_date'})
  @Expose({name: 'start_date'})
  @Type(() => Date)
  startDate: Date;
  @ApiProperty({name: 'end_date'})
  @Expose({name: 'end_date'})
  @Type(() => Date)
  endDate: Date;
  @ApiProperty({name: 'client_id'})
  @Expose({name: 'client_id'})
  clientId: number;
  @ApiProperty()
  @Expose()
  price: number;
}