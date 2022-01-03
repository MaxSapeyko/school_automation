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
import { CreateGradeDto } from './dto/create-grade.dto';
import { Grade } from './entities/grade.entity';
import { GradeService } from './grade.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async all(): Promise<Grade[]> {
        const grade = await this.gradeService.findAll();
        return grade;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() request: CreateGradeDto): Promise<Grade> {
        return await this.gradeService.create(request);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param() param: any): Promise<Grade> {
        const grade = await this.gradeService.findOne(param.id);
        if (!grade) {
            throw new NotFoundException();
        }
        return grade;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() param: any): Promise<Grade> {
        const grade = await this.gradeService.findOne(param.id);
        if (!grade) {
            throw new NotFoundException();
        }
        return grade;
    }
}
