import express from 'express';
import { initUid, client } from '../utils/prismic/prismicByUid.js';

const router = express.Router();

router.get('/detail/:uid', async (req, res) => {
  const uid = req.params.uid;
  const prismicData = await initUid('product', uid, {
    fetchLinks: 'collection.title'
  });
  const { results: home } = await client.getByType('home');
  const product = prismicData;
  res.render('pages/detail', { product, meta: res.locals.meta, home: home[0], preloader: res.locals.preloader });
});

export default router;