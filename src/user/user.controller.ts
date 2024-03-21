import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { userDto } from 'src/dto/user.dto';
import { updateUser } from 'src/dto/updateUser.dto';
import { query } from 'express';
import { Query as ExpressQuery } from  "express-serve-static-core"
import { loginDto } from 'src/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get("/get")
    async getAllUsers():Promise<User[]>{
        return this.userService.findAll()
    }

    @Post("/signup")
    @UseInterceptors(FileInterceptor('file' , {
        storage: diskStorage({
            destination:"./uploads",
            filename:(req,file,cb)=>{
                cb(null,`${file.originalname}`)
            }
        })
    }))
    signUp(@Body() signUpDto:userDto):Promise<{ token: string }>{
        return this.userService.signUp(signUpDto)
    }

    @Post("/login")
    login(@Body() loginDto:loginDto):Promise<{ token: string }>{
        return this.userService.login(loginDto)
    }

    @Post("/upload")
    @UseInterceptors(FileInterceptor('file' , {
        storage: diskStorage({
            destination:"./uploads",
            filename:(req,file,cb)=>{
                cb(null,`${file.originalname}`)
            }
        })
    }))
    async fileUpload(){
        // @UploadedFile() file: Express.Multer.File
        // return { imageUrl: `http://localhost:3003/${file.filename}` };
    }

    // @Post("/add")
    // async addUsers(
    //     @Body()
    //     user:userDto,
    // ):Promise<User>{
    //     return this.userService.create(user)
    // }

    @Put("/update/:id")
    async updateUser(@Param("id") id:string,
    @Body()
    updateData:updateUser):Promise<User>{
        return this.userService.update(id,updateData)
    }

    @Delete("/delete/:id")
    async deleteUser(@Param('id') id:string):Promise<User>{
        return this.userService.delete(id)
    }

    @Get()
    async getUser(@Query() query:ExpressQuery):Promise<User[]>{
        return this.userService.searchAll(query)
    }
    
    @Get(":id")
    async getSingleUser(@Param("id") id:string):Promise<User>{
        return this.userService.getByid(id)
    }
}
