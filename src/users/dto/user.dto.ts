import { Exclude } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  id: number;
  email: string;

  @Exclude()
  password: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.email = entity.email;
    this.password = entity.password;
  }
}
