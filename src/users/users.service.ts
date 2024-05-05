import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(email: string, password: string) {
    return this.usersRepository.create(email, password);
  }

  async findOne(email: string) {
    return this.usersRepository.findOne(email);
  }
}
