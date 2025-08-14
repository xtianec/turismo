import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma';
import auth, { AuthRequest } from '../middleware/auth';

const router = Router();

const createSchema = z.object({
  guideId: z.string().cuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  pricePerDay: z.number().int().positive().optional()
});

// POST /bookings
router.post('/', auth, async (req: AuthRequest, res) => {
  if (!req.user) return res.sendStatus(401);

  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { guideId, startDate, endDate, pricePerDay } = parsed.data;

  const booking = await prisma.booking.create({
    data: {
      touristId: req.user.id,
      guideId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      pricePerDay: pricePerDay ?? 200
    }
  });

  res.status(201).json(booking);
});

// GET /bookings/me
router.get('/me', auth, async (req: AuthRequest, res) => {
  if (!req.user) return res.sendStatus(401);

  const bookings = await prisma.booking.findMany({
    where: { touristId: req.user.id },
    include: {
      guide: { select: { id: true, name: true } },
      review: true
    }
  });

  res.json(bookings);
});

export default router;
