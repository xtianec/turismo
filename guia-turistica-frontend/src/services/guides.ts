import api from '@/lib/api';
import { cached } from '@/lib/cache';

export type GuideCard = {
  id: string; name: string; city: string | null; pricePerDay: number | null; languages: string[];
};

export interface GuideFilters {
  q?: string;
  lang?: string;
}

/**
 * Fetch the list of guides applying optional filters. Results are cached for a
 * short period to avoid repeated network requests when the data doesn't change
 * between views.
 */
export async function fetchGuides(filters: GuideFilters = {}, force = false): Promise<GuideCard[]> {
  const key = `guides:${filters.q ?? ''}:${filters.lang ?? 'all'}`;
  return cached(
    key,
    async () => {
      const { data } = await api.get('/guides', { params: filters });
      return data as GuideCard[];
    },
    undefined,
    force,
  );
}
