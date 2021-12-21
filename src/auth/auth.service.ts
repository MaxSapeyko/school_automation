import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const compareResult = bcrypt.compareSync(password, user.password);
      if (compareResult) {
        return <AuthUserDto>{
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          id: user.id,
          role: user.role,
        };
      }
    }

    return null;
  }

  async login(user: AuthUserDto) {
    const payload = user;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
