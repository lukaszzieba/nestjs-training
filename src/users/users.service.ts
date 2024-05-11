import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(email: string, password: string) {
    return this.usersRepository.create(email, password);
  }

  async findOne(email: string) {
    return this.usersRepository.findOne(email);
  }

  async findOneById(id: number) {
    return this.usersRepository.findOneById(id);
  }
}
