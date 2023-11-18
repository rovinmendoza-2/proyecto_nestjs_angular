import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar para servir archivos estáticos desde la carpeta 'uploads'
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.enableCors();
  await app.listen(3000);
}

bootstrap();
