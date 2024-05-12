import { Exclude } from 'class-transformer';
import { Role } from '../../utils/authorization/role';

export type UserData = {
  id: number;
  email: string;
  password: string;
  role_id: number;
  role_name: Role;
};

export class RoleDto {
  id: number;
  name: Role;

  constructor(id: number, name: Role) {
    this.id = id;
    this.name = name;
  }
}

export class UserDto {
  id: number;
  email: string;

  @Exclude()
  role: RoleDto;

  @Exclude()
  password: string;

  constructor(userData: UserData) {
    this.id = userData.id;
    this.email = userData.email;
    this.password = userData.password;

    this.role = new RoleDto(userData.role_id, userData.role_name);
  }
}
