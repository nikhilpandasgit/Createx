import express from 'express';
import { init } from '../utils/prismic/prismicByType.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('pages/home', { meta: res.locals.meta});
});

export default router;