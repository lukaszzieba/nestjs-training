import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AppError } from '../utils/error/error';
import { Role } from '../utils/authorization';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(email: string, pwd: string) {
    const hashedPassword = await bcrypt.hash(pwd, SALT_ROUNDS);

    return this.usersService.create(email, hashedPassword);
  }

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid login or password');
    }

    return user;
  }

  async getCookieWithJwtToken(userId: number, role: Role) {
    const payload = { id: userId, role };
    const token = await this.jwtService.signAsync(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
