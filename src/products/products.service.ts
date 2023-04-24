import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { AddProductDto } from './dto/add-product.dto';

const fs = require('fs');
const path = require('path')

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private readonly productModel:Model<Product>){}

    async addProduct(addProductDto:AddProductDto,image): Promise<any>{
        const product = await this.productModel.findOne({name:addProductDto.name})
        if (!product){
            const new_product = await new this.productModel(addProductDto)
            new_product.image = `img/products/${image.filename}`
            await new_product.save()
            return this.productModel.find().exec()
        }
    }

    async getAllProducts(){
        return this.productModel.find().exec()
    }   

    async updateProduct(updateProductDto,image,productId){
        const product = await this.productModel.findOne({_id:productId})
        if(product){
            if (updateProductDto.name){
                product.name = updateProductDto.name
            }
            if (updateProductDto.description){
                product.description = updateProductDto.description
            }
            if (updateProductDto.price){
                product.price = updateProductDto.price
            }
            if (image){
                //TODO почистить старый файл.
                fs.unlink(path.resolve(`/backend/static/${product.image}`),(log) =>{
                    console.log(log);
                })
                
                product.image = `img/products/${image.filename}`
            }
            await product.save()
            return this.productModel.find().exec()
        }
    }

    async deleteProduct(productId){
        const product = await this.productModel.findByIdAndDelete(productId)
        return this.productModel.find().exec()
    }

}
