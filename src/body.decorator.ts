import {BadRequestException, createParamDecorator, ExecutionContext} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {BookingEntity} from "./modules/booking/booking.entity";

export const BodyBooking = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body?.start_date) {
      throw new BadRequestException(`Missing required param: 'start_date'`);
    }
    if (!request.body?.end_date) {
      throw new BadRequestException(`Missing required param: 'end_date'`);
    }
    if (!request.body?.car_id) {
      throw new BadRequestException(`Missing required param: 'car_id'`);
    }
    if (!request.body?.client_id) {
      throw new BadRequestException(`Missing required param: 'client_id'`);
    }

    return plainToInstance(BookingEntity, {
      start_date: Number(request.body.start_date), 
      end_date: Number(request.body.end_date), 
      car_id: Number(request.body.car_id),
      client_id: Number(request.body.client_id)});
  }
)