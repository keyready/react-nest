import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors()
  app.use(express.static(join(__dirname,'..','static')))
  
  await app.listen(9999);
}
bootstrap();
