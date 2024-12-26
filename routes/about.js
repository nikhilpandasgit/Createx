import express from 'express';
import { init } from '../utils/prismicByType.js'

const router = express.Router();

router.get('/about', async (req, res) => {
  const prismicData = await init('about');
  if(Object.keys(prismicData).length > 0){
    const about = prismicData.results[0];
    res.render('pages/about', {
      about, meta : res.locals.meta
     });
  } else {
    res.status(404).send('Page not Found');
  }
});

export default router;