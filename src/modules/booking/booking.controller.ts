import {Controller, Delete, Get, Logger, Param, Post} from '@nestjs/common';
import {instanceToPlain} from 'class-transformer';
import {BodyBooking} from 'src/body.decorator';
import {QueryBooking, QueryRequired} from 'src/query.decorator';
import {ResponseDto} from './booking-response.dto';
import {BookingEntity} from './booking.entity';
import {BookingService} from './booking.service';
import {TCalculate, TReport} from './types';
import {ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery} from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  private readonly logger = new Logger(BookingController.name);
  constructor(private service: BookingService) {}

  @ApiOperation({summary: 'Получение всех бронирований'})
  @ApiResponse({type: ResponseDto, isArray: true})
  @Get()
  async getList(): Promise<ResponseDto[]> {
    return this.service.getList();
  }

  @Delete(':id')
  @ApiOperation({summary: 'Удаление бронирования'})
  @ApiResponse({description: 'Пустой ответ'})
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @ApiOperation({summary: 'Расчет суммы'})
  @ApiResponse({schema: {example: {price: 1000}}})
  @ApiResponse({status: 400, description: 'Ошибка валидации'})
  @ApiQuery({type: 'number', name: 'start_date'})
  @ApiQuery({type: 'number', name: 'end_date'})
  @ApiQuery({type: 'number', name: 'car_id'})
  @Get('calculate')
  async calculate(@QueryBooking() body: BookingEntity): Promise<TCalculate> {
    this.logger.log({body: instanceToPlain(body)});
    return this.service.calculate(body);
  }

  @Post()
  @ApiOperation({summary: 'Создание бронирования'})
  @ApiBody({schema: {example: {
    "start_date":1675266084015,
    "end_date":1675784484015,
    "car_id":1,
    "client_id":1
  }}})
  @ApiResponse({type: ResponseDto})
  @ApiResponse({status: 400, description: 'Ошибка валидации'})
  async create(@BodyBooking() body: BookingEntity): Promise<ResponseDto> {
    this.logger.log(body);
    return this.service.create(body);
  }

  @ApiOperation({summary: 'Генерация отчета'})
  @ApiResponse({schema: {example: {
    "С200ХО190": 32.14,
    "Т666СА199": 0,
    "К888НР150": 0,
    "А005ТТ97": 0,
    "А222РМ750": 0,
    "all": 32.14}}})
  @ApiResponse({status: 400, description: 'Ошибка валидации'})
  @ApiQuery({type: 'number', name: 'date'})
  @Get('report')
  async getReport(@QueryRequired('date') date: number): Promise<TReport> {
    this.logger.log({date});
    return this.service.getReport(new Date(date));
  }
}
