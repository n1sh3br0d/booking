import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {BookingModule} from './modules/booking/booking.module';
import {CarModule} from './modules/car/car.module';
import {ClientModule} from './modules/client/client.module';
import databaseConfig from './modules/database/database.config';
import {DatabaseModule} from './modules/database/database.module';
import {MigrationModule} from './modules/migration/migration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true
    }),
    DatabaseModule,
    MigrationModule,
    CarModule,
    ClientModule,
    BookingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
