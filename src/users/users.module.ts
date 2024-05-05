import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  exports: [UsersService],
  providers: [UsersService, UsersRepository],
})
export class UsersModule { }
