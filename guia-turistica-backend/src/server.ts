// src/server.ts
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth'
import guidesRoutes from './routes/guides'
import bookingsRoutes from './routes/bookings'
import reviewsRoutes from './routes/reviews'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173'], // tu Vite dev server
  credentials: false,
}));

app.use(morgan('dev'))
app.use(express.json()) // 👈 obligatorio para que req.body tenga el JSON

app.use('/auth', authRoutes)
app.use('/guides', guidesRoutes)
app.use('/bookings', bookingsRoutes)
app.use('/reviews', reviewsRoutes)

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`API running on http://localhost:${process.env.PORT ?? 3000}`)
})
