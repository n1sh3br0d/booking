import {Exclude, Expose} from "class-transformer";
import {BaseEntity} from "../base/base.entity";
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class ClientEntity extends BaseEntity {
  @ApiProperty()
  @Expose()
  name: string;
}