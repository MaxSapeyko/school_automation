import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { GradeModule } from './grade/grade.module';
import { NewsModule } from './news/news.module';
import { SubjectsModule } from './subject/subjects.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      ssl: process.env.NODE_ENV === 'production',
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    AuthModule,
    NewsModule,
    SubjectsModule,
    GradeModule,
    DiaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
