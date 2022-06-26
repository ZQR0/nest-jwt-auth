import { IsEmail, IsString, MinLength, IsNumber, IsEnum } from "class-validator";

export class RegDTO {
    @IsEmail()
    email: string;

    @MinLength(8, {
        message: 'Password is too short'
    })
    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    // @IsNumber()
    // age: number;

    // @IsString()
    // city: string;

    // @IsEnum({
    //     enum: Gender
    // })
    // gender: string;
}