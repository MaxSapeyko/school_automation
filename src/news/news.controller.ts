import {
    Body,
    ConflictException,
    Controller,
    Get,
    Request,
    Param,
    Post,
    Put,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
    NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';
import { NewsService } from './news.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async all(): Promise<News[]> {
        const news = await this.newsService.findAll();
        return news;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() request: CreateNewsDto): Promise<News> {
        return await this.newsService.create(request);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param() id: string): Promise<News> {
        const news = await this.newsService.findOne(id);
        if (!news) {
            throw new NotFoundException();
        }
        return news;
    }
}
