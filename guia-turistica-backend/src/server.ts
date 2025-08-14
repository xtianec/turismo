// src/server.ts
// Setup express API server
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth';
import guidesRoutes from './routes/guides';
import bookingsRoutes from './routes/bookings';
import reviewsRoutes from './routes/reviews';

const app = express();

// Allow the frontend to talk with this API
const allowedOrigin = process.env.CLIENT_URL ?? 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json()); // 👈 obligatorio para que req.body tenga el JSON

// Health endpoint useful during deployment
app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/guides', guidesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/reviews', reviewsRoutes);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
