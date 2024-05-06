export enum PgErrorCode {
  UniqueViolation = '23505',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
  CheckViolation = '23514',
}

export interface DbError {
  code: PgErrorCode;
  detail: string;
  table: string;
  column?: string;
}
