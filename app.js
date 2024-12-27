import dotenv from 'dotenv-safe';
import { fileURLToPath } from 'url';
import { init } from './utils/prismicByType.js';
import path from 'path';
import morgan from 'morgan';
import fs from 'fs';
import NodeCache from 'node-cache';
import express from 'express';
import homeRouter from './routes/home.js';
import aboutRouter from './routes/about.js';
import detailRouter from './routes/detail.js';
import collectionsRouter from './routes/collections.js';
// import PrismicDOM from 'prismic-dom';
import * as prismicH from '@prismicio/helpers';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDirectory = path.join(__dirname, 'logs');
const port = 3000;
const app = express();
const cache = new NodeCache({ stdTTL: 300});
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');
app.use(morgan('combined', { stream: accessLogStream }));

app.use( async(req, res, next) => {
  let meta = cache.get('meta');
  if(!meta){
    const page = await init('metadata');
    meta = page.results[0];
    cache.set('meta', meta);
  }
  res.locals.meta = meta;
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT
  };
  res.locals.prismicH = prismicH;
  next();
});

app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', detailRouter);
app.use('/', collectionsRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
