import { Module } from '@nestjs/common';
import { UserContoller } from './user.controller';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { DefaultAdminModule, DefaultAdminSite, DefaultAdminController } from 'nestjs-admin'
import { UserAdmin } from './user.admin';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserContoller],
    providers: [UserService, UserDTO, UserEntity, JwtService],
    exports: [TypeOrmModule, UserService, UserDTO, UserEntity, JwtService]
})
export class UserModule {}
