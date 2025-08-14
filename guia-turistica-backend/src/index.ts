import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import guidesRoutes from './routes/guides.js';
import bookingsRoutes from './routes/bookings.js';
import reviewsRoutes from './routes/reviews.js';

const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/guides', guidesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/reviews', reviewsRoutes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
