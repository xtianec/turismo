import { Router } from 'express';
import { z } from 'zod';
import prisma from '../prisma';
import type { Prisma } from '@prisma/client';

const router = Router();

// GET /guides?city=...&lang=ES
router.get('/', async (req, res) => {
  const city = typeof req.query.city === 'string' ? req.query.city : undefined;
  const lang = typeof req.query.lang === 'string' ? req.query.lang.toUpperCase() : undefined;

  const where: Prisma.GuideProfileWhereInput = {};
  if (city) {
    where.city = { name: { contains: city, mode: 'insensitive' } };
  }
  if (lang) {
    where.languages = { some: { languageCode: lang } };
  }

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
