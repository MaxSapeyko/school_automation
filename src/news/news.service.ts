import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import * as bcrypt from 'bcrypt';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}

    async findOne(id: string): Promise<News | undefined> {
        return this.newsRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    async findAll(): Promise<News[]> {
        return this.newsRepository.find();
    }

    async create(news: CreateNewsDto ): Promise<News> {
        let newNews = await this.newsRepository.create({
            ...news,
        });

        newNews = await this.newsRepository.save(newNews);
        return newNews;
    }

}
