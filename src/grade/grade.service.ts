import {
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GradeService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        private readonly userService: UserService,
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
        return this.gradeRepository.find({ relations: ['users'],});
    }

    async create(grade: CreateGradeDto ): Promise<Grade> {
        const newGrade = await this.gradeRepository.create({
            ...grade,
        });

        // const user = await this.userService.updateGradeOne(grade.users[0].id, newGrade);
        
        // newGrade.users ? newGrade.users.push(user) : newGrade.users = [user];

        return await this.gradeRepository.save(newGrade);
    }

      async remove(id: string) {
        const grade = await this.gradeRepository.findOneOrFail(id);

        return await this.gradeRepository.remove(grade);
    }


}
