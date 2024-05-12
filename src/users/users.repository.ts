import { HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { PgErrorCode } from '../types/pgError';
import { AppError, isDbError } from '../utils';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly dbService: DbService) {}

  async create(email: string, password: string) {
    try {
      const dbRes = await this.dbService.runQuery(
        `
          WITH insert_user AS (
            INSERT INTO app_user (email, password) VALUES ($1, $2) RETURNING *
          )    
          SELECT u.id, u.email,  u.password, u.role_id, r.name as role_name from insert_user u JOIN role r on u.role_id = r.id; 
        `,
        [email, password],
      );

      return new UserDto(dbRes.rows[0]);
    } catch (error: unknown) {
      if (isDbError(error) && error.code === PgErrorCode.UniqueViolation) {
        throw new AppError(HttpStatus.BAD_REQUEST, 'User already exist');
      }

      throw error;
    }
  }

  async findOne(email: string) {
    const dbRes = await this.dbService.runQuery(
      `SELECT u.id, u.email, u.password, u.role_id, r.name as role_name FROM app_user u JOIN role r ON u.role_id = r.id WHERE u.email = $1`,
      [email],
    );

    const user = dbRes.rows[0];

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return new UserDto(user);
  }

  async findOneById(id: number) {
    const dbRes = await this.dbService.runQuery(
      `SELECT u.id, u.email,  u.password, u.role_id, r.name as role_name FROM app_user u JOIN role r ON u.role_id = r.id WHERE u.id = $1`,
      [id],
    );

    const user = dbRes.rows[0];

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return new UserDto(user);
  }
}
