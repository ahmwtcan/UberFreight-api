import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from "@nestjs/swagger";
import { createDocument } from "./statics/swagger/swagger";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  SwaggerModule.setup('/', app, createDocument(app))
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
