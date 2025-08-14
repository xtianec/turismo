import api from '@/lib/api';
import { cached, clearCache } from '@/lib/cache';

export async function createBooking(p: {
  guideId: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  pricePerDay?: number;
}) {
  const { data } = await api.post('/bookings', p);
  clearCache('myBookings');
  return data;
}

export async function myBookings(force = false) {
  return cached(
    'myBookings',
    async () => {
      const { data } = await api.get('/bookings/me');
      return data;
    },
    undefined,
    force,
  );
}

export async function createReview(p: { bookingId: string; rating: number; comment?: string }) {
  const { data } = await api.post('/reviews', p);
  clearCache('myBookings');
  return data;
}
