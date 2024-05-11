import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { Env } from './types';
import { envValidationSchema } from './utils';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({ validationSchema: envValidationSchema }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        host: configService.get('DB_HOST')!,
        port: configService.get('DB_PORT')!,
        database: configService.get('DB_NAME')!,
        user: configService.get('DB_USER')!,
        password: configService.get('DB_PASSWORD')!,
      }),
    }),
    AuthModule,
    UsersModule,
    ExercisesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser());
  }
}
