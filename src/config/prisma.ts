// // src/config/prisma.ts
// import 'dotenv/config'; // <--- এই লাইনটি একদম উপরে যোগ করুন
// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import pg from 'pg';

// const connectionString = process.env.DATABASE_URL;

// // ইউআরএলটি ঠিকঠাক পাচ্ছে কিনা তা নিশ্চিত করার জন্য একটি ছোট সেফটি চেক
// if (!connectionString) {
//   throw new Error("DATABASE_URL is not defined in your environment variables!");
// }

// const pool = new pg.Pool({ connectionString });
// const adapter = new PrismaPg(pool);

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export const getPrisma = () => {
//   return prisma;
// };


import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 💡 লোকালহোস্টে ব্যাকআপ হিসেবে .env রিড করার জন্য সেফটি কোড (Vercel-এ এটি স্কিপ হবে)
if (process.env.NODE_ENV !== 'production') {
  await import('dotenv/config');
}

const connectionString = process.env.DATABASE_URL;

// ইউআরএলটি ঠিকঠাক পাচ্ছে কিনা তা নিশ্চিত করার জন্য সেফটি চেক
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in your environment variables!");
}

const pool = new pg.Pool({ 
  connectionString,
  // 💡 ক্লাউড ডাটাবেজ (Supabase/Neon) এর জন্য SSL কানেকশন বাধ্যতামূলক করা হলো
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 🎯 প্রিজমা v7 এর নতুন অ্যাডাপ্টার পাস করা হলো
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const getPrisma = () => {
  return prisma;
};