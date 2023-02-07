import {DatabaseService} from "../database/database.service";
import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../base/base.repository";
import {ClientEntity} from "./client.entity";

@Injectable()
export class ClientRepository extends BaseRepository<ClientEntity> {
  constructor(db: DatabaseService) {
    super(db, 'clients', ClientEntity);
  }
}