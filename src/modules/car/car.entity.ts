import {Exclude, Expose} from "class-transformer";
import {BaseEntity} from "../base/base.entity";
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class CarEntity extends BaseEntity {
  @ApiProperty({name: 'government_number'})
  @Expose({name: 'government_number'})
  governmentNumber: string;
}