import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import AppError from 'src/utils/error/error';

// This should be a real class/interface representing a user entity
export type User = { id: number; email: string; password: string };

const users: User[] = [
  {
    id: 1,
    email: 'john',
    password: 'changeme',
  },
  {
    id: 2,
    email: 'maria',
    password: 'guess',
  },
];

@Injectable()
export class UsersRepository {
  async create(email: string, password: string) {
    const exist = users.some((user) => user.email === email);

    if (exist) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'User already exist');
      // throw new HttpException('udpa', HttpStatus.BAD_REQUEST);
    }

    const user = {
      id: Math.floor(Math.random() * 1000),
      email,
      password,
    };

    users.push(user);

    return user;
  }

  async findOne(email: string) {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }
}
