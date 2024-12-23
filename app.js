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
  
}

app.set('views', path.resolve('views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('pages/home');
});

app.get('/about', (req, res) => {
	res.render('pages/about');
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

