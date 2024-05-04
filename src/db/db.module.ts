import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import {
  CONNECTION_POOL,
  DB_OPTIONS,
  ConfigurableDbModule,
} from './db.module-definition';
import { DbService } from './db.service';
import { DbOptions } from './dbOptions';

@Global()
@Module({
  exports: [DbService],
  providers: [
    DbService,
    {
      provide: CONNECTION_POOL,
      inject: [DB_OPTIONS],
      useFactory: (dbOptions: DbOptions) => {
        return new Pool({
          host: dbOptions.host,
          port: dbOptions.port,
          user: dbOptions.user,
          password: dbOptions.password,
          database: dbOptions.database,
        });
      },
    },
  ],
})
export class DbModule extends ConfigurableDbModule { }
