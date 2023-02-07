import {Module} from "@nestjs/common";
import {CarModule} from "../car/car.module";
import {ClientModule} from "../client/client.module";
import {DatabaseModule} from "../database/database.module";
import {BookingController} from "./booking.controller";
import {BookingRepository} from "./booking.repository";
import {BookingService} from "./booking.service";

@Module({
  imports: [DatabaseModule, CarModule, ClientModule],
  providers: [BookingRepository, BookingService],
  controllers: [BookingController],
  exports: []
})

export class BookingModule {
}