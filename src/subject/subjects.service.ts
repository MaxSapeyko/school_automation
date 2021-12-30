import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './entities/subjects.entity';
import * as bcrypt from 'bcrypt';
import { CreateSubjectsDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
    constructor(
        @InjectRepository(Subjects)
        private readonly subjectsRepository: Repository<Subjects>,
    ) {}

    async findOne(id: string): Promise<Subjects | undefined> {
        return this.subjectsRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async findAll(): Promise<Subjects[]> {
        return this.subjectsRepository.find();
    }

    async create(subjects: CreateSubjectsDto ): Promise<Subjects> {
        let newSubjects = await this.subjectsRepository.create({
            ...subjects,
        });

        newSubjects = await this.subjectsRepository.save(newSubjects);
        return newSubjects;
    }

}
