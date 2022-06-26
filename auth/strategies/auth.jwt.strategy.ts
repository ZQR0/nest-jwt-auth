import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConst } from "./auth.jwt.constant";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConst.secret,
        })
    }

    public async validateUser({id}: Pick<UserEntity, 'id'>, {password}: Pick<UserEntity, 'password'>): Promise<any> {
        const user = await this.userService.findById(id);

        if (user && user.password === password) {
            return user;
        }
        
        return "Invalid cridentials";
    }
};