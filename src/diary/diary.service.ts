import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './entities/diary.entity';
import * as bcrypt from 'bcrypt';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
    constructor(
        @InjectRepository(Diary)
        private readonly diaryRepository: Repository<Diary>,
    ) {}

    async findOne(id: string): Promise<Diary | undefined> {
        return this.diaryRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async findAll(): Promise<Diary[]> {
        return this.diaryRepository.find();
    }

    async create(diary: CreateDiaryDto ): Promise<Diary> {
        let newDiary = await this.diaryRepository.create({
            ...diary,
        });

        newDiary = await this.diaryRepository.save(newDiary);
        return newDiary;
    }

}
