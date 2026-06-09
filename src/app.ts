import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './config/routes.js';

const app: Application = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://shelflock-client.vercel.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'store-id'],
  })
);


app.use(express.json());

// অ্যাপ্লিকেশন রাউটস
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome to ShelfLock API' });
});

// গ্লোবাল এরর হ্যান্ডলার
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "https://shelflock-client.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;