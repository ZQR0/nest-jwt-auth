import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserDTO } from 'src/user/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/auth.jwt.strategy';
import { JwtConst } from './strategies/auth.jwt.constant';
import { AuthController } from './auth.contoller';
import { RegDTO } from './auth.register.dto';

@Module({
    imports:[
        UserModule,
        JwtModule.register({
            secret: JwtConst.secret,
            signOptions: {expiresIn: '31d'},
            secretOrPrivateKey: JwtConst.secret
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserDTO, UserEntity, JwtStrategy, JwtService, RegDTO],
    exports: [AuthService, JwtStrategy, JwtService]
})
export class AuthModule {}
