import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type Role = 'ADMIN' | 'GUIDE' | 'TOURIST';

export interface AuthUser {
  id: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export default function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.sendStatus(401);

  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    res.sendStatus(401);
  }
}
