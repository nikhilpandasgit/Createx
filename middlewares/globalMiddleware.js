import { init } from '../utils/prismic/prismicByType.js';
import * as prismicH from '@prismicio/helpers';
import { getCachedData } from '../utils/cacheHelper.js'
import { linkResolver } from '../utils/linkResolver.js'

export const globalMiddleware = (cache) => async(req, res, next) => {
  res.locals.meta = await getCachedData('meta', async () => {
    const page = await init('metadata');
    return page.results[0];
  }, cache);

  res.locals.preloader = await getCachedData('preloader', async () => {
    const page = await init('preloader');
    return page.results[0];
  }, cache);

  res.locals.navigation = await getCachedData('navigation', async () => {
    const page = await init('navigation');
    return page.results[0];
  }, cache);

  res.locals.prismicH = prismicH;
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT
  };
  res.locals.Link = linkResolver;
  res.locals.Numbers = (index) => ['One', 'Two', 'Three', 'Four'][index] || '';

  next();
}
