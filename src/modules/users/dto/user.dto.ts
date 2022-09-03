import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';


export class UserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(4)
    readonly password: string;

    @IsNotEmpty()
    @MinLength(4)
    readonly confirm_password: string;
}