import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(4920);
}

bootstrap();
