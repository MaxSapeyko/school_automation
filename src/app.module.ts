import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE,
            entities: [join(__dirname, '**', '*.entity.{ts,js}')],
            ssl: process.env.NODE_ENV === 'production',
            synchronize: true,
        }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
