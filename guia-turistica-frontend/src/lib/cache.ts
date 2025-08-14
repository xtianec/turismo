export type CachedEntry<T> = {
  expiry: number;
  data: T;
};

const cache = new Map<string, CachedEntry<unknown>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieve a cached value or fetch it using the provided function.
 * @param key unique cache key
 * @param fetcher async function that returns the data to cache
 * @param ttl time-to-live in ms (defaults to 5 minutes)
 * @param force if true, bypasses cache and fetches fresh data
 */
export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
  force = false
): Promise<T> {
  const now = Date.now();
  const entry = cache.get(key) as CachedEntry<T> | undefined;

  if (!force && entry && entry.expiry > now) {
    return entry.data;
  }

  const data = await fetcher();
  cache.set(key, { expiry: now + ttl, data });
  return data;
}

/** Clear a cache entry or the entire cache when no key is provided */
export function clearCache(key?: string) {
  if (key) cache.delete(key);
  else cache.clear();
}
