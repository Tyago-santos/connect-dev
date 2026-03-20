declare module 'pg' {
export interface QueryResult<T = unknown> {
  rows: T[];
  rowCount?: number;
}

  export interface PoolConfig {
    connectionString?: string;
    ssl?: { rejectUnauthorized: boolean } | boolean;
    host?: string;
    user?: string;
    password?: string;
    database?: string;
    port?: number;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    query<T = unknown>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;
  }
}
