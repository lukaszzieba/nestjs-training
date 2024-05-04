import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { CONNECTION_POOL } from './db.module-definition';

@Injectable()
export class DbService {
  private readonly logger = new Logger('SQL');
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) { }

  async runQuery(query: string, params?: unknown[]) {
    return this.queryWithLogging(this.pool, query, params);
  }

  async getPoolClient() {
    const poolClient = await this.pool.connect();

    return new Proxy(poolClient, {
      get: (target: PoolClient, propertyName: keyof PoolClient) => {
        if (propertyName === 'query') {
          return (query: string, params?: unknown[]) => {
            return this.queryWithLogging(target, query, params);
          };
        }
        return target[propertyName];
      },
    });
  }

  private async queryWithLogging(
    pool: Pool | PoolClient,
    query: string,
    params?: unknown[],
  ) {
    const queryPromise = pool.query(query, params);

    // message without unnecessary spaces and newlines
    const message = this.getLogMessage(query, params)
      .replace(/\n|/g, '')
      .replace(/  +/g, ' ');

    queryPromise
      .then(() => {
        this.logger.log(message);
      })
      .catch((error: any) => {
        this.logger.warn(message);
        throw error;
      });

    return queryPromise;
  }

  private getLogMessage(query: string, params?: unknown[]) {
    if (!params) {
      return `Query: ${query}`;
    }
    return `Query: ${query} Params: ${JSON.stringify(params)}`;
  }
}
