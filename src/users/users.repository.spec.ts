import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { DbService } from '../db/db.service';

describe('UsersRepository', () => {
  let service: UsersRepository;
  let runQueryMock: jest.Mock;

  beforeEach(async () => {
    runQueryMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: DbService, useValue: runQueryMock },
      ],
    }).compile();

    service = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
