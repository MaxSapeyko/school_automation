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
    Delete,
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
    async get(@Param() param: any): Promise<Subjects> {
        const subjects = await this.subjectsService.findOne(param.id);
        if (!subjects) {
            throw new NotFoundException();
        }
        return subjects;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() param: any): Promise<Subjects> {
        const subjects = await this.subjectsService.findOne(param.id);
        if (!subjects) {
            throw new NotFoundException();
        }
        return subjects;
    }
}
