import { DbError } from 'src/types/pgError';

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isDbError(value: unknown): value is DbError {
  if (!isRecord(value)) {
    return false;
  }
  const { code, detail, table } = value;

  return Boolean(code && detail && table);
}
