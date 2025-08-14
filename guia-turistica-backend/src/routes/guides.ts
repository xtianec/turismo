import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma';
import type { Prisma } from '@prisma/client';

const router = Router();

// GET /guides?q=...&lang=ES
router.get('/', async (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : undefined;
  const lang = typeof req.query.lang === 'string' ? req.query.lang.toUpperCase() : undefined;

  const filters: Prisma.GuideProfileWhereInput[] = [];
  if (q) {
    filters.push({
      OR: [
        { user: { name: { contains: q, mode: 'insensitive' } } },
        { city: { name: { contains: q, mode: 'insensitive' } } }
      ]
    });
  }
  if (lang) {
    filters.push({ languages: { some: { languageCode: lang } } });
  }

  const where: Prisma.GuideProfileWhereInput =
    filters.length > 0 ? { AND: filters } : {};

  const guides = await prisma.guideProfile.findMany({
    where,
    include: {
      user: { select: { id: true, name: true } },
      city: true,
      languages: { select: { languageCode: true } }
    },
    orderBy: { ratePerDay: 'asc' }
  });

  res.json(
    guides.map(g => ({
      id: g.userId,
      name: g.user.name,
      city: g.city?.name ?? null,
      pricePerDay: g.ratePerDay,
      languages: g.languages.map(l => l.languageCode)
    }))
  );
});

const updateSchema = z.object({
  displayName: z.string().min(2).optional(),
  bio: z.string().max(1000).optional(),
  ratePerDay: z.number().int().positive().optional()
});

// PATCH /guides/:userId
router.patch('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  // Mapea sólo campos presentes para que el tipo coincida
  const data: Prisma.GuideProfileUpdateInput = {};
  if (parsed.data.displayName !== undefined) data.displayName = parsed.data.displayName;
  if (parsed.data.bio !== undefined) data.bio = parsed.data.bio;
  if (parsed.data.ratePerDay !== undefined) data.ratePerDay = parsed.data.ratePerDay;

  const profile = await prisma.guideProfile.update({
    where: { userId },
    data
  });

  res.json(profile);
});

export default router;
