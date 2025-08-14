import api from '@/lib/api';

export type GuideCard = {
  id: string; name: string; city: string | null; pricePerDay: number | null; languages: string[];
};

export async function fetchGuides(): Promise<GuideCard[]> {
  const { data } = await api.get('/guides');
  return data;
}
