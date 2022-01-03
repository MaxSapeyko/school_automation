import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateSubjectsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    classes: string[];

    @IsNotEmpty()
    users: User[];
}
