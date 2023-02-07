import {Injectable} from '@nestjs/common';
import {ClientEntity} from './client.entity';
import {ClientRepository} from './client.repository';

@Injectable()
export class ClientService {

  constructor(private repo: ClientRepository) {}

  async getList(): Promise<ClientEntity[]> {
    return this.repo.findAll();
  }
}
