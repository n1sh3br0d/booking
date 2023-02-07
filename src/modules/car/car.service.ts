import {Injectable} from '@nestjs/common';
import {validateDates} from 'src/utils';
import {CarEntity} from './car.entity';
import {CarRepository} from './car.repository';

@Injectable()
export class CarService {

  constructor(private repo: CarRepository) {}

  async getFreeCars(startDate: Date, endDate: Date): Promise<CarEntity[]> {
    validateDates(startDate, endDate);
    return this.repo.getFreeCars(startDate, endDate);
  }
}
