import express from 'express';
import { init } from '../utils/prismic/prismicByType.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { results: home } = await init('home');
  const { results: collections } = await init('collection', {
    fetchLinks: 'product.product'
  });
  res.render('pages/home', { collections, meta: res.locals.meta, home: home[0], preloader: res.locals.preloader });
});

export default router;