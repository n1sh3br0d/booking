import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {CarController} from "./car.controller";
import {CarRepository} from "./car.repository";
import {CarService} from "./car.service";

@Module({
  imports: [DatabaseModule],
  providers: [CarRepository, CarService],
  controllers: [CarController],
  exports: [CarRepository]
})

export class CarModule {
}