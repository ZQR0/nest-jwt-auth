import { Controller, Get, Post, Param, Body, ValidationPipe, UsePipes, HttpCode, Req, Res, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./auth.dto";
import { RegDTO } from "./auth.register.dto";
import { Auth } from "./decorators/auth.decorator";
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @HttpCode(200)
    @Get('test')
    public async getTest(): Promise<any> {
        return this.authService.getTest();
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    public async login(@Body() dto: AuthDTO, @Res({passthrough: true}) res: Response): Promise<any> {
        const loginJwt = await this.authService.login(dto);
        res.cookie('jwt', loginJwt, {httpOnly: true});

        return loginJwt;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    public async register(@Body() dto: RegDTO, @Res() res: Response): Promise<any> {
        return await this.authService.register(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('logout')
    public async logout(@Res({ passthrough: true }) res: Response) {
        await res.clearCookie('jwt');
        return await this.authService.logout();
    }

}