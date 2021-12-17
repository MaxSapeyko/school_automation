import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/core/enums/roles.enum';
import { Sex } from 'src/core/enums/sex.enum';

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
    photoUrl: string;

    @IsEnum(Role)
    role: 'student' | 'teacher' | 'administrator';
    
    class: string;
    education: string;
    position: string;
    specialization: string;
    classes: string[];
    universityAddress: string;

    @IsEnum(Sex)
    sex: 'man' | 'woman';

    dateOfBirth: Date;
    dairyId: string;
}
