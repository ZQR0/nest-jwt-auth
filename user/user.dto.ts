import { IsString, IsNumber, IsBoolean, IsDate, IsEnum } from "class-validator";
import { Gender } from "src/entities/user.entity";

export class UserDTO {

    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsString()
    status?: string;

    @IsNumber()
    age: number;

    @IsString()
    city: string;

    @IsBoolean()
    isActive: boolean;

    @IsString()
    avatarPath: string;

    @IsDate()
    birthdayDate: Date;

    @IsEnum({
        enum: Gender
    })
    gender: string;

}