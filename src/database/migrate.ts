import { db, isPostgres, getMysqlPool, getPgPool } from './connection.js';

const migrationsRunKey = 'migrations_run_v1';

const serialType = isPostgres ? 'SERIAL' : 'INT AUTO_INCREMENT PRIMARY KEY';
const textType = isPostgres ? 'TEXT' : 'TEXT';
const timestampType = isPostgres ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME';

async function runSql(sql: string) {
  if (isPostgres) {
    await getPgPool().query(sql);
  } else {
    await getMysqlPool().query(sql);
  }
}

export async function runMigrations() {
  try {
    const migrationsLogTable = `
      CREATE TABLE IF NOT EXISTS migrations_log (
        id ${serialType},
        migration_key VARCHAR(100) NOT NULL
      )
    `;
    await runSql(migrationsLogTable);

    const existing = await db.query<{ migration_key: string }>(
      'SELECT migration_key FROM migrations_log WHERE migration_key = ?',
      [migrationsRunKey]
    );

    if (existing.length > 0) {
      return;
    }

    const usersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id ${serialType} PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        birthdate DATE,
        work VARCHAR(100),
        avatar VARCHAR(500),
        cover VARCHAR(500)
      )
    `;
    await runSql(usersTable);

    const postsTable = `
      CREATE TABLE IF NOT EXISTS posts (
        id ${serialType} PRIMARY KEY,
        type VARCHAR(50),
        created_at ${timestampType},
        body ${textType},
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await runSql(postsTable);

    const postlikesTable = `
      CREATE TABLE IF NOT EXISTS postlikes (
        id ${serialType} PRIMARY KEY,
        id_user INTEGER NOT NULL,
        created_at ${timestampType},
        id_post INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `;
    await runSql(postlikesTable);

    const postscommentsTable = `
      CREATE TABLE IF NOT EXISTS postscomments (
        id ${serialType} PRIMARY KEY,
        created_at ${timestampType},
        id_user INTEGER NOT NULL,
        id_post INTEGER NOT NULL,
        body ${textType},
        FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `;
    await runSql(postscommentsTable);

    const userRelationsTable = `
      CREATE TABLE IF NOT EXISTS user_relations (
        id ${serialType} PRIMARY KEY,
        user_from INTEGER NOT NULL,
        user_to INTEGER NOT NULL,
        FOREIGN KEY (user_from) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (user_to) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await runSql(userRelationsTable);

    await db.execute(`INSERT INTO migrations_log (migration_key) VALUES (?)`, [migrationsRunKey]);
  } catch (error) {
    throw error;
  }
}
