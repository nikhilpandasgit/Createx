import * as prismic from '@prismicio/client';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, { fetch });

export const init = async (type) => {
  const prismicDoc = await client.getByType(type);
  return prismicDoc;
}
