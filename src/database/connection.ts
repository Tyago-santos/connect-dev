import mysql from 'mysql2/promise';
import { Pool as PgPool } from 'pg';

export const dbDialect =
  process.env.DB_DIALECT ||
  (process.env.NODE_ENV === 'production' ? 'postgres' : 'mysql');

export const isPostgres = dbDialect === 'postgres';

export const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'connect_dev',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
};

export const pgConfig = (() => {
  if (process.env.DATABASE_URL) {
    const config: {
      connectionString: string;
      ssl?: { rejectUnauthorized: boolean };
    } = { connectionString: process.env.DATABASE_URL };

    if (process.env.PGSSL === 'true') {
      config.ssl = { rejectUnauthorized: false };
    }

    return config;
  }

  return {
    host: process.env.PG_HOST || '127.0.0.1',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS || '',
    database: process.env.PG_DB || 'connect_dev',
    port: Number(process.env.PG_PORT || 5432),
  };
})();

let mysqlPool: mysql.Pool | null = null;
let pgPool: PgPool | null = null;

export const getMysqlPool = () => {
  if (!mysqlPool) {
    mysqlPool = mysql.createPool(dbConfig);
  }
  return mysqlPool;
};

export const getPgPool = () => {
  if (!pgPool) {
    pgPool = new PgPool(pgConfig);
  }
  return pgPool;
};

export const toPostgresSql = (sql: string) => {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
};

type DbParams = Array<string | number | boolean | null | Date>;

export const db = {
  async query<T>(sql: string, params: DbParams = []): Promise<T[]> {
    if (isPostgres) {
      const pgSql = toPostgresSql(sql);
      const result = await getPgPool().query(pgSql, params);
      return result.rows as T[];
    }

    const [rows] = await getMysqlPool().execute(sql, params as any);
    return rows as T[];
  },
  async insert(sql: string, params: DbParams = []): Promise<{ insertId: number }> {
    if (isPostgres) {
      const pgSql = toPostgresSql(sql);
      const result = await getPgPool().query(pgSql, params);
      const row = result.rows[0] as { id?: number } | undefined;
      if (!row?.id) {
        throw new Error('Insert failed: no id returned');
      }
      return { insertId: row.id };
    }

    const [result] = await getMysqlPool().execute<mysql.ResultSetHeader>(
      sql,
      params as any,
    );
    return { insertId: result.insertId };
  },
  async execute(sql: string, params: DbParams = []): Promise<{ affectedRows: number }> {
    if (isPostgres) {
      const pgSql = toPostgresSql(sql);
      const result = await getPgPool().query(pgSql, params);
      return { affectedRows: result.rowCount ?? 0 };
    }

    const [result] = await getMysqlPool().execute<mysql.ResultSetHeader>(
      sql,
      params as any,
    );
    return { affectedRows: result.affectedRows };
  },
};
