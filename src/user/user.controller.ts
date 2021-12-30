import {
    Body,
    ConflictException,
    Controller,
    Get,
    Request,
    Param,
    Post,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
    NotFoundException,
    Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async all(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() request: CreateUserDto): Promise<User> {
        const user = await this.userService.findOne(request.email);
        if (user) {
            throw new ConflictException('System User exists.');
        } else {
            return await this.userService.create(request);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async get(@Param() id: string): Promise<User> {
        const user = await this.userService.get(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param() id: string): Promise<User> {
        const user = await this.userService.remove(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
}
