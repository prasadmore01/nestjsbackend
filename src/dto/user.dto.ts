import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, isNotEmpty, isString } from "class-validator"

export class userDto{

    @IsNotEmpty()
    @IsString()
    readonly name:string

    @IsNotEmpty()
    @IsEmail()
    readonly mail:string

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password:string

    readonly imgpath:string

    readonly gender:string

    readonly dob:string

}