// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './config/routes.js';

// const app: Application = express();

// // 💡 ডাইনামিক CORS কনফিগারেশন
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // লোকালহোস্ট এবং আপনার ফ্রন্টএন্ডের ডোমেইনগুলো এখানে দিন
//       const allowedOrigins = [
//         'http://localhost:5173', // Vite লোকালহোস্ট
//         'http://localhost:3000', // Next.js লোকালহোস্ট
//         'https://shelflock-client.vercel.app/admin', // 👈 আপনার আসল ফ্রন্টএন্ডের Vercel লিংক এখানে বসাবেন
//       ];

//       // origin যদি আনডিফাইন্ড হয় (যেমন: Postman বা মোবাইল অ্যাপের রিকোয়েস্ট), তবে অ্যালাউ করবে
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true, // কুকি বা অথরাইজেশন হেডার পাস করার জন্য
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'store-id'], // 👈 আপনার 'store-id' হেডারটি এখানে অ্যালাউ করা হয়েছে
//   })
// );

// app.use(express.json());

// // অ্যাপ্লিকেশন রাউটস (Modulo Pattern)
// app.use('/api/v1', router);

// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json({ success: true, message: 'Welcome to ShelfLock API' });
// });

// export default app;


import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './config/routes.js';

const app: Application = express();

// ১. ডাইনামিক CORS কনফিগারেশন (যেটা আগে করেছিলেন)
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://shelflock-client.vercel.app', // 👈 আপনার ফ্রন্টএন্ড
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

// 💡 [IMPORTANT FIX] প্রি-ফ্লাইট (OPTIONS) রিকোয়েস্ট সরাসরি হ্যান্ডেল করার জন্য
app.options('*', cors()); 

app.use(express.json());

// অ্যাপ্লিকেশন রাউটস
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Welcome to ShelfLock API' });
});

// 💡 [IMPORTANT FIX] গ্লোবাল এরর হ্যান্ডলার (যাতে ব্যাকএন্ড ক্র্যাশ করলেও CORS নষ্ট না হয়)
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