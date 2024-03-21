import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path"
import multer = require('multer');
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './exception/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useStaticAssets(path.join(__dirname,"../uploads"))
  app.useGlobalPipes(new ValidationPipe({exceptionFactory:validationExceptionFactory}))
  await app.listen(3003);
}
bootstrap();
