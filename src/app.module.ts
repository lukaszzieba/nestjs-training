import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { Env } from './types';
import { envValidationSchema } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({ validationSchema: envValidationSchema }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        host: configService.get('DB_HOST') as string,
        port: configService.get('DB_PORT') as number,
        database: configService.get('DB_NAME') as string,
        user: configService.get('DB_USER') as string,
        password: configService.get('DB_PASSWORD') as string,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
