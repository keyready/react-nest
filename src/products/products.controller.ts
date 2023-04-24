import { Body, Controller, Get, Param, Post,UploadedFile,UseGuards,UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

import { extname } from 'path';
import { AuthGuard } from 'src/users/auth.guard';
import { AddProductDto } from './dto/add-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {

    constructor(private readonly productService:ProductsService){}

    @Post('/create_product')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination: './static/img/products',
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async addProduct(@Body() addProductDto:AddProductDto,@UploadedFile() image): Promise<any>{
        return this.productService.addProduct(addProductDto,image)
    }

    @Get('/products')
    async getAllProducts(): Promise<any>{
        return this.productService.getAllProducts() 
    }

    @Post('/update_product/:id')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination: './static/img/products',
            filename: (req, file, cb) => {
                const randomName = Array(15).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                console.log(`${randomName}${extname(file.originalname)}`);
                return cb(null, `${randomName}${extname(file.originalname)}`)}})
    }))
    async updateProduct(@Body() updateProductDto:UpdateProductDto,@UploadedFile() image,@Param('id') productId:string){
        return this.productService.updateProduct(updateProductDto,image,productId)
    }   

    @Post('/delete_product')
    @UseGuards(AuthGuard)
    async deleteProduct(@Body() productId: string){
        return this.productService.deleteProduct(productId)
    }

}
