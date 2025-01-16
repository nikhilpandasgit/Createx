import dotenv from 'dotenv-safe';
import { fileURLToPath } from 'url';
import { init } from './utils/prismic/prismicByType.js';
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
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDirectory = path.join(__dirname, 'logs');
const port = 3000;
const app = express();
const cache = new NodeCache({ stdTTL: 300 });
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride())

app.use(async (req, res, next) => {
  let meta = cache.get('meta');
  let preloader = cache.get('preloader');
  if (!meta) {
    const page = await init('metadata');
    meta = page.results[0];
    cache.set('meta', meta);
  }
  if (!preloader) {
    const page = await init('preloader');
    preloader = page.results[0];
    cache.set('preloader', preloader);
  }
  res.locals.meta = meta;
  res.locals.preloader = preloader;
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT
  };
  res.locals.prismicH = prismicH;
  res.locals.Numbers = index => {
    return index == 0 ? 'One' : index == 1 ? "Two" : index == 2 ? 'Three' : index == 3 ? 'Four' : '';
  }
  next();
});

app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', detailRouter);
app.use('/', collectionsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
