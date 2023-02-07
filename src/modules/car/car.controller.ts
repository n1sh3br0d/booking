import {Controller, Get, Logger} from '@nestjs/common';
import {QueryRequired} from 'src/query.decorator';
import {CarEntity} from './car.entity';
import {CarService} from './car.service';
import {ApiOperation, ApiResponse, ApiTags, ApiQuery} from '@nestjs/swagger';


@ApiTags('cars')
@Controller('cars')
export class CarController {
  private readonly logger = new Logger(CarController.name);
  constructor(private service: CarService) {}

  @ApiOperation({description: 'Список доступных автомобилей в диапазоне дат'})
  @ApiResponse({type: CarEntity, description: 'Список автомобилей', isArray: true})
  @ApiQuery({type: 'number', name: 'start_date'})
  @ApiQuery({type: 'number', name: 'end_date'})
  @ApiResponse({status: 400, description: 'Ошибка валидации'})
  @Get('free')
  async getFreeCars(@QueryRequired('start_date',) startDate: number, @QueryRequired('end_date') endDate: number): Promise<CarEntity[]> {
    this.logger.log({start_date: startDate, end_date: endDate});
    return this.service.getFreeCars(new Date(startDate), new Date(endDate));
  }
}
