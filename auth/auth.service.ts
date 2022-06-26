import { Injectable, NotFoundException, UnauthorizedException, Logger } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/entities/user.entity";
import { AuthDTO } from "./auth.dto";
import { genSalt, hash } from 'bcryptjs';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegDTO } from "./auth.register.dto";
import { JwtConst } from "./strategies/auth.jwt.constant";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        @InjectRepository(UserEntity)
        private authRepository: Repository<UserEntity>
    ) {}

    public getTest() {
        return {
            message: "Test passed"
        } 
    }

    public async login(dto: AuthDTO) {
        const user = await this.validateUser(dto);

        return {
            user: await this.getUserFields(user, user.email),
            accessToken: await this.issueAccessToken(String(user.id)),
            options: {
                expriresIn: "31 days maximum",
                status: "Test Passed"
            }
        }
    }

    public async logout() {
        return {
            message: "Logout successfully",
            status: 200
        }
    }


    public async register(dto: RegDTO) {
        const email: string = dto.email
        const oldUser = await this.authRepository.findOne({
            where: {email}
        });

        if (oldUser) {
            throw new UnauthorizedException('User with this email already exists');
        }
        
        const salt = await genSalt(10);
        
        const newUser = new UserEntity();
        newUser.email = dto.email;
        newUser.password = await hash(dto.password, salt);
        newUser.name = dto.name;
        newUser.surname = dto.surname;

        const user = await this.authRepository.save(newUser);

        return {
            user: await this.getUserFields(user, user.email),
            accessToken: await this.issueAccessToken(String(user.id)),
            options: {
                expriresIn: "31 days",
                status: "Test Passed"
            }
        }
        
    }

    private async validateUser(dto: AuthDTO): Promise<UserEntity> {
        const user = await this.userService.findByEmailWithPassword(dto.email, dto.password)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isValidPassword = await dto.password === user.password;
        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid cridentials');
        }

        return user;
    }

    private async getUserFields(userEntity: UserEntity, email: string) {
        const user = await this.userService.findByEmail(email)

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            isActive: user.isActive,
            isVerified: user.isVerified,
            avatarPath: user.avatarPath
        };
    };

    private async issueAccessToken(userId: string) {
        const data = {id: userId};

        const accessToken = await this.jwtService.signAsync(
            data,
            {
                expiresIn: '31d',
                secret: JwtConst.secret
            }
        )

        return {accessToken}
    }

}