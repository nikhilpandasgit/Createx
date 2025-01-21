import dotenv from 'dotenv-safe';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import NodeCache from 'node-cache';
import express from 'express';
import homeRouter from './routes/home.js';
import aboutRouter from './routes/about.js';
import detailRouter from './routes/detail.js';
import collectionsRouter from './routes/collections.js';
import methodOverride from 'method-override';
import { globalMiddleware } from './middlewares/globalMiddleware.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const logDirectory = path.join(__dirname, 'logs');
const port = process.env.PORT || 3000;
const cacheTTL = process.env.CACHE_TTL || 300;
const cache = new NodeCache({ stdTTL: cacheTTL });
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "img-src": ["'self'", "https:"]
    }
  }
}));

app.use(globalMiddleware(cache));

app.use('/', homeRouter);
app.use('/', aboutRouter);
app.use('/', detailRouter);
app.use('/', collectionsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
