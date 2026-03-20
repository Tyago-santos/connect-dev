declare module 'express-mysql-session' {
  import type { SessionOptions, Store } from 'express-session';

  type MySQLStoreFactory = (
    session: (options?: SessionOptions) => unknown,
  ) => new (options?: Record<string, unknown>, connection?: unknown) => Store;

  const factory: MySQLStoreFactory;
  export default factory;
}
