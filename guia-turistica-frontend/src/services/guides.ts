import api from '@/lib/api';
import { cached } from '@/lib/cache';

export type GuideCard = {
  id: string; name: string; city: string | null; pricePerDay: number | null; languages: string[];
};

/**
 * Fetch the list of guides. Results are cached for a short period to avoid
 * repeated network requests when the data doesn't change between views.
 */
export async function fetchGuides(force = false): Promise<GuideCard[]> {
  return cached(
    'guides',
    async () => {
      const { data } = await api.get('/guides');
      return data as GuideCard[];
    },
    undefined,
    force,
  );
}
