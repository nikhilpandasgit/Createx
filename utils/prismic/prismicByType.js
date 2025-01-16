import * as prismic from '@prismicio/client';
import fetch from 'node-fetch';
import dotenv from 'dotenv-safe';

dotenv.config();
const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, { fetch });

/**
 * Fetch data by type from Prismic
 * @param {string} type - The type of document to fetch
 * @returns {Promise<Object>} - The fetched document
 */

export const init = async (type, options = {}) => {
  const prismicDoc = await client.getByType(type, options);
  return prismicDoc;
}

export { client };
