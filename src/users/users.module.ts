import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

import { JwtModule } from '@nestjs/jwt'
import { UsersService } from './users.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    JwtModule.register({
      global:true,
      secret:'пока общий секрет, но нужно разделение на 2 вида токенов',
      signOptions:{expiresIn:'60s'}
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
