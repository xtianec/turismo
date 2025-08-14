import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import type { UserRole } from '@prisma/client';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['ADMIN', 'GUIDE', 'TOURIST']).default('TOURIST')
});

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { email, password, name, role } = parsed.data;

const emailNorm = email.trim().toLowerCase();

const exists = await prisma.user.findUnique({ where: { email: emailNorm } });

  if (exists) return res.status(409).json({ error: 'Email ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hash, name, role: role as UserRole }
  });

  if (role === 'GUIDE') {
    await prisma.guideProfile.create({
      data: { userId: user.id, displayName: name, ratePerDay: 200 }
      // 👆 Nada de languages aquí. Se agrega luego con otra API.
    });
  }

  res.status(201).json({ id: user.id });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });

  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: '7d'
  });

  res.json({ token });
});

export default router;
