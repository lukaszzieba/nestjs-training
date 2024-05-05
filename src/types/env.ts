export interface Env {
  NODE_ENV: string;
  PORT: number;

  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_URL: string;
  DB_USER: string;
  DB_PASSWORD: string;

  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
}
