import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Query } from  "express-serve-static-core"
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { userDto } from 'src/dto/user.dto';
import { loginDto } from 'src/dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(userDto:userDto):Promise<{ token: string}>{
        const {name,mail,password,imgpath,gender,dob} = userDto
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await this.userModel.create({
            name,
            mail,
            password: hashedPassword,
            imgpath,
            gender,
            dob
        })

        const token = this.jwtService.sign({id:user._id})
        return { token }
    }

    async login(loginDto:loginDto): Promise<{ token: string,uname: string, imgp:string,id:object}>{
        const { mail,password } = loginDto
        const user = await this.userModel.findOne({ mail })

        if(!user){
            throw new UnauthorizedException("Invalid Email or Password")
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password)
        
        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid Email or Password")
        }

        const token = this.jwtService.sign({id:user._id})

        const uname = user.name
        const imgp = user.imgpath
        const id = user._id
        return { token,uname,imgp,id}
    }

    async findAll():Promise<User[]>{
        const user = await this.userModel.find()
        return user
    }

    async create(user:User):Promise<User>{
        const res = await this.userModel.create(user)
        return res
    }

    async update(id,data):Promise<User>{
        const res = await this.userModel.findByIdAndUpdate(id,data,{new:true})
        return res
    }

    async delete(id):Promise<User>{
        const res = await this.userModel.findByIdAndDelete(id)
        return res
    }

    async searchAll(query: Query):Promise<User[]>{

        const keyword = query.keyword ? {
            name:{
                $regex:query.keyword,
                $options:"i"
            }
        } : {}

        const user = await this.userModel.find({...keyword})
        return user
    }

    async getByid(id):Promise<User>{
        const res = await this.userModel.findById(id)
        return res;
    }
}
