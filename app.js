import dotenv from 'dotenv';
import * as prismic from '@prismicio/client';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
const port = 3000;

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
dotenv.config();

const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, { fetch })
const init = async () => {
  const prismicDoc = await client.get();
  return prismicDoc;
}

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('pages/home');
});

app.get('/about', async (req, res) => {
  const prismicData = await init();
  const aboutPages = prismicData.results.filter(doc => doc.type === 'about' || doc.type === 'metadata');
  if(aboutPages.length > 0){
    const results = aboutPages;
    const about = results.find(item => item.type ==='about');
    const meta = results.find(item => item.type ==='metadata');
    console.log(about, meta);
    res.render('pages/about', { });
  } else {
    res.status(404).send('Page not Found');
  }
});

app.get('/detail/:uid', (req, res) => {
	res.render('pages/detail');
});

app.get('/collections', (req, res) => {
	res.render('pages/collections');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});


// const prismic = require('@prismicio/client');
// const PrismicDOM = require('prismic-dom');

// const handleLinkResolver = doc => {

//   return '/'
// }

// app.use((req, res, next) => {
//   res.locals.ctx = {
//     endpoint: process.env.PRISMIC_ENDPOINT,
//     linkResolver: handleLinkResolver
//   }

//   res.locals.PrismicDOM = PrismicDOM;
//   next();
// })

