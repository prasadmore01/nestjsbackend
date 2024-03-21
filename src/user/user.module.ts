import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config : ConfigService) => {
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>("JWT_EXPIRE"),
          },
        };
      },
    }),
    MongooseModule.forFeature([{name:"User", schema:UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
