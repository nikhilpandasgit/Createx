import express from 'express';
import { init } from '../utils/prismicByType.js';

const router = express.Router();

router.get('/collections', (req, res) => {
  res.render('pages/collections', { meta: res.locals.meta });
});

export default router;