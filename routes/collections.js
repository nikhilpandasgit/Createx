import express from 'express';
import { init, client } from '../utils/prismic/prismicByType.js';

const router = express.Router();

router.get('/collections', async(req, res) => {
  const { results: collections } = await init('collection', {
    fetchLinks: 'product.product'
  });
  const { results: home } = await client.getByType('home');

  console.log(collections.forEach((collection) => {console.log(collection.data.products)}))
  res.render('pages/collections', { collections, meta: res.locals.meta, home: home[0] });
});

export default router;