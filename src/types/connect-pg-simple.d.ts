declare module 'connect-pg-simple' {
  import type { SessionOptions, Store } from 'express-session';
  import type { Pool } from 'pg';

  interface Options {
    pool?: Pool;
    conString?: string;
    tableName?: string;
    schemaName?: string;
    createTableIfMissing?: boolean;
  }

  type PgSessionFactory = (
    session: (options?: SessionOptions) => unknown,
  ) => new (options?: Options) => Store;

  const factory: PgSessionFactory;
  export default factory;
}
