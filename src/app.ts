import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import mustacheExpress from 'mustache-express';
import router from './routes/index.ts';
import session from 'express-session';
import flash from 'connect-flash';

export const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
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
