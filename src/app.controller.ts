import { Controller, Get,Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Response() res){
    return this.appService.getIndex(res);
  }
}
