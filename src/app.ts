import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './config/routes.js';

const app: Application = express();

// 💡 ডাইনামিক CORS কনফিগারেশন
app.use(
  cors({
    origin: (origin, callback) => {
      // লোকালহোস্ট এবং আপনার ফ্রন্টএন্ডের ডোমেইনগুলো এখানে দিন
      const allowedOrigins = [
        'http://localhost:5173', // Vite লোকালহোস্ট
        'http://localhost:3000', // Next.js লোকালহোস্ট
        'https://shelflock-client.vercel.app', // 👈 আপনার আসল ফ্রন্টএন্ডের Vercel লিংক এখানে বসাবেন
      ];

      // origin যদি আনডিফাইন্ড হয় (যেমন: Postman বা মোবাইল অ্যাপের রিকোয়েস্ট), তবে অ্যালাউ করবে
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // কুকি বা অথরাইজেশন হেডার পাস করার জন্য
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'store-id'], // 👈 আপনার 'store-id' হেডারটি এখানে অ্যালাউ করা হয়েছে
  })
);

app.use(express.json());

// অ্যাপ্লিকেশন রাউটস (Modulo Pattern)
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome to ShelfLock API' });
});

export default app;