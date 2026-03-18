import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import mustacheExpress from 'mustache-express';
import router  from './routes/index.ts';

export const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve('public')));

app.engine('mustache', mustacheExpress(path.resolve('src/views/partials')));
app.set('view engine', 'mustache');
app.set('views', path.resolve('src/views'));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('servidor rodando');
});
