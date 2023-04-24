import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({
    versionKey:false,
    timestamps:false,
    collection:'users'
})
export class User{

    @Prop({type:String,required:true})
    firstname:string

    @Prop({type:String,required:true})
    lastname: string

    @Prop({type:String,required:true,unique:true})
    login: string
    
    @Prop({type:String,required:true})
    password: string

    @Prop({type:String,required:true,unique:true})
    image: string

    @Prop({type:Array,default:['USER']})
    roles: Array<String>

    @Prop({type:Array,default:[]})
    selected_products: Array<String>

    @Prop({type:String,unique:true})
    refresh_token: string

}

export const UserSchema = SchemaFactory.createForClass(User)