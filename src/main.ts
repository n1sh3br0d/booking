import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {MigrationService} from './modules/migration/migration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Booking cars')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const migration = app.get(MigrationService);
  await migration.run();
  await app.listen(3000);
}
bootstrap();

// 1 1675266084015 
// 7 1675784484015
// 15 1676475684015
// 28 1677598884015
