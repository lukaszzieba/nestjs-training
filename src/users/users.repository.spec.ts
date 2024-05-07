import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { DbService } from '../db/db.service';
import { UserDto, UserEntity } from './dto/user.dto';
import { DbError, PgErrorCode } from '../types/pgError';
import { AppError } from '../utils';

describe('UsersRepository', () => {
  let service: UsersRepository;
  let runQueryMock: jest.Mock;
  let userModelData: UserEntity;

  beforeEach(async () => {
    runQueryMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: DbService, useValue: { runQuery: runQueryMock } },
      ],
    }).compile();

    service = module.get<UsersRepository>(UsersRepository);
  });

  describe('when the create method is called', () => {
    describe('and the database returns valid data', () => {
      beforeEach(() => {
        userModelData = {
          id: 1,
          email: 'john@smith.com',
          password: 'hashed_pwd',
        };

        runQueryMock.mockResolvedValue({
          rows: [userModelData],
        });
      });

      it('should return an instance of the UserDto', async () => {
        const result = await service.create('john@smith.com', 'hashed_pwd');

        expect(result instanceof UserDto).toBe(true);
      });

      it('should return the UserModel with correct properties', async () => {
        const result = await service.create('john@smith.com', 'pwd');

        expect(result.id).toBe(userModelData.id);
        expect(result.email).toBe(userModelData.email);
        expect(result.password).toBe(userModelData.password);
      });
    });

    describe('and the database throws the UniqueViolation', () => {
      beforeEach(() => {
        const databaseError: DbError = {
          code: PgErrorCode.UniqueViolation,
          table: 'users',
          detail: 'Key (email)=(john@smith.com) already exists.',
        };

        runQueryMock.mockImplementation(() => {
          throw databaseError;
        });
      });

      it('should throw bad req exertion', () => {
        return expect(() =>
          service.create(userModelData.email, userModelData.password),
        ).rejects.toThrow(
          new AppError(HttpStatus.BAD_REQUEST, 'User already exist'),
        );
      });
    });
  });
});
