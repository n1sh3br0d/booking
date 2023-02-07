import {Controller, Get} from '@nestjs/common';
import {ClientEntity} from './client.entity';
import {ClientService} from './client.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private service: ClientService) {}

  @ApiOperation({description: 'Список клиентов'})
  @ApiResponse({type: ClientEntity, description: 'Список клиентов', isArray: true})
  @Get()
  async getList(): Promise<ClientEntity[]> {
    return this.service.getList();
  }
}
