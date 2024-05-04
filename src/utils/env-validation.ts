import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DB_HOST: Joi.string().default('127.0.0.1'),
  DB_PORT: Joi.number().port().default(5432),
  DB_NAME: Joi.string().default('training'),
  DB_URL: Joi.string().default('url'),
  DB_USER: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('pwd'),
});
