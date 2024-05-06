import { IsEmail, IsString } from 'class-validator';

export class AuhtDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
