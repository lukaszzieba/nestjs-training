import { Exclude } from 'class-transformer';

export type UserEntity = {
  id: number;
  email: string;
  password: string;
};

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
