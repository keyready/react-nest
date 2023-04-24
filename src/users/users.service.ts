import { Injectable,UnauthorizedException,NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly userModel:Model<User>,
        private jwtService: JwtService,
    ){}

    async register(registerUserDto:RegisterUserDto,image): Promise<any>{
        const candidate = await this.userModel.findOne({login:registerUserDto.login})
        if (!candidate){
            const user = await new this.userModel(registerUserDto)
            user.password = bcrypt.hashSync(registerUserDto.password,5)
            user.image = `img/users/${image.filename}`
            return user.save()
        }
        else{
            throw new NotFoundException();
        }
    }

    async login(loginUserDto:LoginUserDto):Promise<any>{
        
        const candidate = await this.userModel.findOne({login:loginUserDto.login})
        if (candidate && bcrypt.compareSync(loginUserDto.password,candidate.password)){
            
            const access_token = await this.jwtService.signAsync({'id':candidate._id,'roles':candidate.roles})
            const refresh_token = await this.jwtService.signAsync({'id':candidate._id})
            candidate.refresh_token = refresh_token
            candidate.save()
            const user = candidate.toJSON()
            return {
                ...user,
                access_token,
                refresh_token
            }
        }
        else{
            throw new UnauthorizedException()
        }
    }

    async resfresh(refresh_token: string): Promise<any>{
        const candidate = await this.userModel.findOne({refresh_token:refresh_token})
        if(candidate){
            const access_token = await this.jwtService.signAsync({'id':candidate._id,'roles':candidate.roles})
            const refresh_token = await this.jwtService.signAsync({'id':candidate._id})
            candidate.refresh_token = refresh_token
            candidate.save()
            const user = candidate.toJSON();
            return {
                ...user,
                access_token:access_token,
                refresh_token:refresh_token
            }
        }
        else{
            throw new UnauthorizedException()
        }
    }

    async logout(resfresh_token:string){
        const user = await this.userModel.findOne({refresh_token:resfresh_token})
        if(!user){
            throw new UnauthorizedException()
        }
        user.refresh_token = null
        return user.save()
    }

}
