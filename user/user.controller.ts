import {
    Controller,
    Get,
    Body,
    ValidationPipe,
    Param,
    Post,
    Put,
    UsePipes,
    HttpCode,
    Req,
    UnauthorizedException,
    Patch,
    Delete
} from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "./user.service";
import { CurrentUser } from "./decorators/user.decorator";
import { UserDTO } from "./user.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";


@Controller('user')
export class UserContoller {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    @Get('test')
    public async getTest() {
        return await {
            message: "User controller works"
        }
    }

    @Get('profile')
    public async getUserPage(_id: number) {
        return this.userService.getUserPage(_id);
    }

    @Get('by-id/:id')
    public async userById(@Param(':id') id: number): Promise<UserEntity> {
        return this.userService.findById(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put('update-profile')
    @Auth()
    public async updateProfile(
        @CurrentUser('id') _id: number,
        @Body() dto: UserDTO
    ) {
        return this.userService.updateUser(_id, dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Get('get-user')
    @Auth()
    public async getUser(@Req() req: Request) {
        const cookie = await req.cookies['jwt'];

        const data = await this.jwtService.verifyAsync(cookie);

        if (!data) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.findById(data['id']);

        return user;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    @Auth()
    public async updateUser(@Param('id') id: number, @Body() dto: UserDTO) {
        return await this.userService.updateUser(id, dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Patch(':friendId')
    @Auth()
    public async toggleFriend(
        @CurrentUser('id') userId: any,
        @Param('friendId') friendId: any
    ) {
        return await this.userService.addToFriend(userId, friendId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Patch(':friendId')
    @Auth()
    public async removeFriend(
        @CurrentUser('id') userId: any,
        @Param('friendid') friendId: any
    ) {
        return await this.userService.removeFromFriends(userId, friendId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Get(':userId/friendsCount')
    @Auth()
    public async getFriendsCount(
        @CurrentUser('id') userId: any,
    )
    {
        return await this.userService.getFriendsCount(userId);
    };
}