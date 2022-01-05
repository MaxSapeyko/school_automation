import {
    Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UserService } from 'src/user/user.service';
import { SubjectsService } from 'src/subject/subjects.service';

@Injectable()
export class GradeService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        private readonly userService: UserService,
        private readonly subjectService: SubjectsService,
    ) {}

    async findOne(id: string): Promise<Grade | undefined> {
        return this.gradeRepository.findOne({
            where: {
                id: id,
            },
            relations: ['users'],
        });
    }

    async findAll(): Promise<Grade[]> {
        return this.gradeRepository.find({ relations: [ 'subject', 'user'],});
    }

    async create(grade: CreateGradeDto ): Promise<Grade> {
        const newGrade = await this.gradeRepository.create({
            ...grade,
        });
        const user = await this.userService.findOneById(grade.userId);
        const subject = await this.subjectService.findOne(grade.subjectId);
        //     const subject = await this.subjectService.updateGradeOne(grade.subjectId, newGrade)            

        if (!user) {
            throw new NotFoundException('User not found');
        }


        if (!subject){
            throw new NotFoundException('Subject not found');
        }

        if (subject && user) {
            newGrade.subject = subject;
            newGrade.user = user;
            newGrade.userID = user.id;

            // await this.userService.updateGradeOne(grade.userId, newGrade);
            
            return await this.gradeRepository.save(newGrade);
        }
    }

      async remove(id: string) {
        const grade = await this.gradeRepository.findOneOrFail(id);

        return await this.gradeRepository.remove(grade);
    }


}
