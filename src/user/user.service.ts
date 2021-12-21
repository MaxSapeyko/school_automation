import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async get(id: string): Promise<User> {
        return this.userRepository.findOneOrFail(id);
    }

    async create(user: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: user.email,
            },
        });
        if (existingUser) {
            throw new BadRequestException(
                'User with specified email already exists',
            );
        }
        const password: string = await bcrypt.hash(user.password, 10);
        let newUser = await this.userRepository.create({
            ...user,
            password,
        });
        newUser = await this.userRepository.save(newUser);
        return newUser;
    }

    async remove(id: string) {
        const user = await this.userRepository.findOneOrFail(id);

        return await this.userRepository.remove(user);
    }

}
