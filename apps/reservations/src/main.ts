import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  // app.useLogger(app.get(Logger))
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
