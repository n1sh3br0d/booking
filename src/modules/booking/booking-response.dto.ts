import {Expose} from "class-transformer";
import {CarEntity} from "../car/car.entity";
import {ClientEntity} from "../client/client.entity";
import {BookingEntity} from "./booking.entity";
import {ApiProperty} from '@nestjs/swagger';

export class ResponseDto extends BookingEntity {
  @ApiProperty()
  @Expose()
  client: ClientEntity;
  @ApiProperty()
  @Expose()
  car: CarEntity;
}