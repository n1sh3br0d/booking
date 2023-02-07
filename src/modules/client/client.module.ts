import {Module} from "@nestjs/common";
import {DatabaseModule} from "../database/database.module";
import {ClientController} from "./client.controller";
import {ClientRepository} from "./client.repository";
import {ClientService} from "./client.service";

@Module({
  imports: [DatabaseModule],
  providers: [ClientRepository, ClientService],
  controllers: [ClientController],
  exports: [ClientRepository]
})

export class ClientModule {
}