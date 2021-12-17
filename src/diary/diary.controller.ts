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
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Diary } from './entities/diary.entity';
import { DiaryService } from './diary.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('diary')
export class DiaryController {
    constructor(private readonly diaryService: DiaryService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async all(): Promise<Diary[]> {
        const diary = await this.diaryService.findAll();
        return diary;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() request: CreateDiaryDto): Promise<Diary> {
        return await this.diaryService.create(request);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param() id: string): Promise<Diary> {
        const diary = await this.diaryService.findOne(id);
        if (!diary) {
            throw new NotFoundException();
        }
        return diary;
    }
}
