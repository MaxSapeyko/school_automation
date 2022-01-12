import {
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './entities/subjects.entity';
import { CreateSubjectsDto } from './dto/create-subject.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Grade } from 'src/grade/entities/grade.entity';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subjects)
        private readonly subjectsRepository: Repository<Subjects>,
        private readonly userService: UserService,
    ) {}

    async findOne(id: string): Promise<Subjects | undefined> {
        return this.subjectsRepository.findOne({
            where: {
                id: id,
            },
            relations: ['users'],
        });
    }

    async updateGradeOne(subjectId: string, grade: Grade): Promise<Subjects | undefined> {
        const subject = await this.subjectsRepository.findOneOrFail(subjectId);

        subject.grades ? subject.grades.push(grade) : subject.grades = [grade];
        
        return await this.subjectsRepository.save(subject);
    }

    async findAll(): Promise<Subjects[]> {
        return this.subjectsRepository.find({ relations: ['users'],});
    }

    async create(subjects: CreateSubjectsDto ): Promise<Subjects> {
        const newSubject = await this.subjectsRepository.create({
            ...subjects,
        });

        const user = await this.userService.updateSubjectOne(subjects.users[0].id, newSubject);
        
        newSubject.users ? newSubject.users.push(user) : newSubject.users = [user];

        return await this.subjectsRepository.save(newSubject);
    }

      async remove(id: string) {
        const subject = await this.subjectsRepository.findOneOrFail(id);

        return await this.subjectsRepository.remove(subject);
    }
}
