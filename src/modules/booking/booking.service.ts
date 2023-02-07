import {BadRequestException, Injectable} from '@nestjs/common';
import {add, merge} from 'lodash';
import {filter, find, map, reduce} from 'lodash/fp';
import {getDays, getPointOfMonth, validateDates} from 'src/utils';
import {CarRepository} from '../car/car.repository';
import {ClientRepository} from '../client/client.repository';
import {ResponseDto} from './booking-response.dto';
import {BookingEntity} from './booking.entity';
import {BookingRepository} from './booking.repository';
import {TCalculate, TReport} from './types';

@Injectable()
export class BookingService {
  constructor(private repo: BookingRepository, private carRepo: CarRepository, private clientRepo: ClientRepository) {}

  async getList(): Promise<ResponseDto[]> {
    const bookings = await this.repo.findAll();
    const cars = await this.carRepo.findAll();
    const clients = await this.clientRepo.findAll();

    return map(b => {
      const car = find(c => c.id === b.carId, cars);
      const client = find(c => c.id === b.clientId, clients);
      return merge(b, {car, client});
    }, bookings);
  }

  async remove(id: number): Promise<void> {
    return this.repo.removeById(id);
  }

  async calculate(body: BookingEntity): Promise<TCalculate> {
    validateDates(body.startDate, body.endDate);
    const cars = await this.carRepo.getFreeCars(body.startDate, body.endDate);
    const car = find(c => c.id === body.carId, cars);
    if (!car) {
      throw new BadRequestException('Car is busy');
    }
    return {price: this.getPrice(body.startDate, body.endDate)};
  }

  async create(body: BookingEntity): Promise<ResponseDto> {
    validateDates(body.startDate, body.endDate);
    const cars = await this.carRepo.getFreeCars(body.startDate, body.endDate);
    const car = find(c => c.id === body.carId, cars);
    if (!car) {
      throw new BadRequestException('Car is busy');
    }
    const client = await this.clientRepo.findById(body.clientId);
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    body.price = this.getPrice(body.startDate, body.endDate);
    const entity = await this.repo.create(body);
    return merge(entity, {car, client});
  }

  async getReport(date: Date): Promise<TReport> {
    const [firstDate, lastDate] = getPointOfMonth(date);
    const bookings = await this.repo.getBetweenDates(firstDate, lastDate);
    const days = lastDate.getDate();
    const cars = await this.carRepo.findAll();
    const result = {};
    
    map(c => {
      const filtered = filter(b => b.carId === c.id, bookings);
      const value = reduce((prev: number, current: BookingEntity) => {
        let d = getDays(current.startDate, current.endDate);
        if (current.endDate.getTime() > lastDate.getTime()) {
          d = getDays(current.startDate, lastDate);
        } else if (current.startDate.getTime() < firstDate.getTime()) {
          d = getDays(firstDate, current.endDate);
        }
        return Number(((d/days) * 100).toFixed(2)) + prev;
      }, 0, filtered);
      result[c.governmentNumber] = value;
    }, cars);
    result['all'] = reduce((add), 0, Object.values(result));

    return result;
  }

  private getPrice(startDate: Date, endDate: Date): number {
    const days = getDays(startDate, endDate);
    let restDays = days;
    const tarif = (discount?: number) => {
      let dis = 0;
      if (discount) {
        dis = 1000 * (discount/100);
      }
      return 1000 - dis;
    }
    let price = 0;
    if (days > 4) {
      price += 4 * tarif();
      restDays = restDays - 4;
      if (days > 9) {
        price += 5 * tarif(5);
        restDays = restDays - 5;
        if (days > 17) {
          price += 7 * tarif(10);
          restDays = restDays - 7;
          price += restDays * tarif(25)
        } else {
          price += restDays * tarif(10);
        }
      } else {
        price += restDays * tarif(5);
      }
    } else {
      price += restDays * tarif();
    }
    return price;
  }
}
