import {createParamDecorator, ExecutionContext, BadRequestException} from '@nestjs/common'
import {plainToInstance} from 'class-transformer';
import {BookingEntity} from './modules/booking/booking.entity';

export const QueryRequired = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const value = request.query[key];

    if (value === undefined) {
      throw new BadRequestException(`Missing required query param: '${key}'`);
    }

    return Number(value);
  }
)

export const QueryBooking = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.query?.start_date) {
      throw new BadRequestException(`Missing required query param: 'start_date'`);
    }
    if (!request.query?.end_date) {
      throw new BadRequestException(`Missing required query param: 'end_date'`);
    }
    if (!request.query?.car_id) {
      throw new BadRequestException(`Missing required query param: 'car_id'`);
    }

    return plainToInstance(BookingEntity, {
      start_date: Number(request.query.start_date), 
      end_date: Number(request.query.end_date), 
      car_id: Number(request.query.car_id)});
  }
)