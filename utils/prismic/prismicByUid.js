import * as prismic from '@prismicio/client';
import fetch from 'node-fetch';
import dotenv from 'dotenv-safe';

dotenv.config();
const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, { fetch });

/**
 * Fetch data by UID from Prismic
 * @param {string} type - The type of document to fetch
 * @param {string} uid - The unique identifier for the document
 * @param {Object} options - Optional Prismic query options (e.g., fetchLinks)
 * @returns {Promise<Object>} - The fetched document
 */

export const initUid = async (type, uid, options = {}) => {
  const prismicDoc = await client.getByUID(type, uid, options);
  return prismicDoc;
}

export { client };