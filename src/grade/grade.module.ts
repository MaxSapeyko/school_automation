import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from 'src/subject/subjects.module';
import { UserModule } from 'src/user/user.module';
import { Grade } from './entities/grade.entity';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
    imports: [TypeOrmModule.forFeature([Grade]),
    forwardRef(() => UserModule),
    forwardRef(() => SubjectsModule),
],
    controllers: [GradeController],
    providers: [GradeService],
    exports: [GradeService],
})
export class GradeModule {}
