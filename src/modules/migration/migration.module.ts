import {DatabaseModule} from '../database/database.module';
import {Module} from '@nestjs/common';
import {MigrationService} from './migration.service';

@Module({
  imports: [DatabaseModule],
  providers: [MigrationService],
  exports: [MigrationService]
})

export class MigrationModule {
}
