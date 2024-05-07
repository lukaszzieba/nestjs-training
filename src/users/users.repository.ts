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
        `INSERT INTO app_user (email, password) VALUES ($1, $2) RETURNING *`,
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
      `SELECT *  FROM app_user WHERE email = $1`,
      [email],
    );

    const user = dbRes.rows[0];

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return new UserDto(user);
  }
}
