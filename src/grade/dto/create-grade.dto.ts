import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    grade: number;

    @IsDate()
    data: Date;

    @IsNotEmpty()
    userId: string;
    
    @IsNotEmpty()
    subjectId: string;
}
