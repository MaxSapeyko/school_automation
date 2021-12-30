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
import { CreateSubjectsDto } from './dto/create-subject.dto';
import { Subjects } from './entities/subjects.entity';
import { SubjectsService } from './subjects.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('subjects')
export class SubjectsController {
    constructor(private readonly subjectsService: SubjectsService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async all(): Promise<Subjects[]> {
        const subjects = await this.subjectsService.findAll();
        return subjects;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() request: CreateSubjectsDto): Promise<Subjects> {
        return await this.subjectsService.create(request);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param() id: string): Promise<Subjects> {
        const subjects = await this.subjectsService.findOne(id);
        if (!subjects) {
            throw new NotFoundException();
        }
        return subjects;
    }
}