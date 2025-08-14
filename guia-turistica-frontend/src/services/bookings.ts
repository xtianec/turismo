import api from '@/lib/api';

export async function createBooking(p: {
  guideId: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  pricePerDay?: number;
}) {
  const { data } = await api.post('/bookings', p);
  return data;
}

export async function myBookings() {
  const { data } = await api.get('/bookings/me');
  return data;
}

export async function createReview(p: { bookingId: string; rating: number; comment?: string }) {
  const { data } = await api.post('/reviews', p);
  return data;
}
