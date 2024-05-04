import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Env } from './types';
import { DbService } from './db/db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<Env>,
    private readonly db: DbService,
  ) { }

  @Get()
  async getHello() {
    const res = await this.db.runQuery('SELECT 1');

    return res.rows;
  }
}
