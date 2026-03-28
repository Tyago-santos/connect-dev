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

// Permit assets (avatars/covers) served from Supabase/public URLs.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Em produção, o Render/Heroku usa proxy; precisamos confiar nele para que cookies \"secure\" sejam aceitos.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

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

// Disponibiliza avatar/cover com fallback para todas as views (header, feed, etc.)
app.use((req, res, next) => {
  const avatar =
    req.session.user?.avatar && req.session.user.avatar !== '0'
      ? req.session.user.avatar
      : '/media/avatars/avatar.jpg';
  const cover =
    req.session.user?.cover && req.session.user.cover !== '0'
      ? req.session.user.cover
      : '/media/covers/cover_placeholder.jpg';

  res.locals.perfilAvatar = avatar;
  res.locals.perfilCover = cover;
  next();
});

app.engine('mustache', mustacheExpress(path.resolve('src/views/partials')));
app.set('view engine', 'mustache');
app.set('views', path.resolve('src/views'));

import { runMigrations } from './database/migrate.js';

app.use(router);

import NotFoundController from './controller/notFoundController.js';
const notFoundController = new NotFoundController();

app.use(notFoundController.index);

const startServer = async () => {
  await runMigrations();
  
  app.listen(process.env.PORT);
};

startServer();
