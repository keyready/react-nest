import { Controller,Body,Post,UseInterceptors,UploadedFile,UseGuards,Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post('/register')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination: './static/img/users',
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async register(@Body() registerUserDto:RegisterUserDto,@UploadedFile() image): Promise<any>{
        return this.userService.register(registerUserDto,image)
    }

    @Post('/login')
    async login(@Body() loginUserDto:LoginUserDto): Promise<any>{
        return this.userService.login(loginUserDto)
    }

    @Post('/refresh')
    async refresh(@Body('refresh_token') refresh_token: string){
        return this.userService.resfresh(refresh_token)
    }

    @Post('/logout')
    async logout(@Body('refresh_token') refresh_token: string){
        return this.userService.logout(refresh_token)
    }

}
