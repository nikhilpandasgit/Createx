export const getCachedData = async (key, fetchFn, cache, ttl = 300) => {
  let data = cache.get(key);
  if(!data){
    data = await fetchFn(key);
    cache.set(key, data, ttl);
  }
  return data;
}