import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    grade: number;

    @IsDate()
    date: Date;

    @IsNotEmpty()
    userId: string;
    
    @IsNotEmpty()
    subjectId: string;
}
