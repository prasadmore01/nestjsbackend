import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true
})
export class User{

    @Prop()
    name:string

    @Prop()
    mail:string

    @Prop()
    password:string

    @Prop()
    imgpath:string

    @Prop()
    gender:string

    @Prop()
    dob:string

}

export const UserSchema = SchemaFactory.createForClass(User)