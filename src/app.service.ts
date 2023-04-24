import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  getIndex(res){
    return res.sendFile(join(__dirname,'..','..','frontend','index.html'))
  }
}
