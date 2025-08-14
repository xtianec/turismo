import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma';
import auth, { AuthRequest } from '../middleware/auth';

const router = Router();

const reviewSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional()
});

// POST /reviews
router.post('/', auth, async (req: AuthRequest, res) => {
  if (!req.user) return res.sendStatus(401);

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  // Asegura que el booking es del usuario y no tiene review
  const booking = await prisma.booking.findFirst({
    where: { id: parsed.data.bookingId, touristId: req.user.id },
    include: { review: true }
  });
  if (!booking) return res.status(404).json({ error: 'Booking no encontrado' });
  if (booking.review) return res.status(409).json({ error: 'Ya tiene review' });

  const review = await prisma.review.create({
    data: {
      bookingId: booking.id,
      touristId: req.user.id,
      guideId: booking.guideId,
      rating: parsed.data.rating,
      comment: parsed.data.comment ?? null
    }
  });

  res.status(201).json(review);
});

export default router;
