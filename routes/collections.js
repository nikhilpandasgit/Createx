import express from 'express';
import { init, client } from '../utils/prismic/prismicByType.js';

const router = express.Router();

router.get('/collections', async (req, res) => {
  const { results: collections } = await init('collection', {
    fetchLinks: 'product.product'
  });
  const { results: home } = await init('home');
  res.render('pages/collections', { collections, meta: res.locals.meta, home: home[0], preloader: res.locals.preloader });
});

export default router;