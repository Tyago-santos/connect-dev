import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import mustacheExpress from 'mustache-express';
import router from './routes/index.js';
import session from 'express-session';
import flash from 'connect-flash';
import MySQLStoreFactory from 'express-mysql-session';
import mysql from 'mysql2';
import connectPgSimple from 'connect-pg-simple';
import { dbConfig, dbDialect, getPgPool } from './database/connection.js';

export const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

const MySQLStore = MySQLStoreFactory(session);
const PgSession = connectPgSimple(session);
const sessionStore =
  dbDialect === 'postgres'
    ? new PgSession({
        pool: getPgPool(),
        createTableIfMissing: true,
      })
    : new MySQLStore(
        {
          createDatabaseTable: true,
        },
        mysql.createPool(dbConfig),
      );

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);
app.use(flash());

app.use(express.static(path.resolve('public')));

app.engine('mustache', mustacheExpress(path.resolve('src/views/partials')));
app.set('view engine', 'mustache');
app.set('views', path.resolve('src/views'));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('servidor rodando');
});
