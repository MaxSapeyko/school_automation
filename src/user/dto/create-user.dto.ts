import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/core/enums/roles.enum';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    photo: string;

    @IsEnum(Role)
    role: 'student' | 'teacher' | 'administrator';
}
