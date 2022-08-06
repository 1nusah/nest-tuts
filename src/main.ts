import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );
  await app.listen(4920);
}

bootstrap();
