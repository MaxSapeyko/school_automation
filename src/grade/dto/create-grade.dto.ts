import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    grade: number;

    @IsDateString()
    date: Date;

    @IsNotEmpty()
    userId: string;
    
    @IsNotEmpty()
    subjectId: string;
}
