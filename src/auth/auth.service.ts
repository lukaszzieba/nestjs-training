import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import AppError from 'src/utils/error/error';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(email: string, pwd: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(pwd, SALT_ROUNDS);

    return this.usersService.create(email, hashedPassword);
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Invalid login or password');
    }

    return user;
  }

  async getCookieWithJwtToken(userId: number) {
    const payload = { userId };
    const token = await this.jwtService.signAsync(payload);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
