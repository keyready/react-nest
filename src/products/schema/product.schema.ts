import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose'

export type ProductDocument = HydratedDocument<Product>

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'products'
})

export class Product{
    @Prop({type:String,required:true,unique:true})
    name:string

    @Prop({type:String,required:true})
    description: string

    @Prop({type:Number,required:true})
    price: number

    @Prop({type:String,required:true})
    image: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)