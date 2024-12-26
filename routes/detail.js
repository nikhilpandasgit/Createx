import express from 'express';
import { init } from '../utils/prismicByType.js';

const router = express.Router();

router.get('/detail/:uid', (req, res) => {
	res.render('pages/detail', { meta: res.locals.meta });
});

export default router;