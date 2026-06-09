// // src/config/prisma.ts
// import 'dotenv/config'; // <--- এই লাইনটি একদম উপরে যোগ করুন
// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import pg from 'pg';

// const connectionString = process.env.DATABASE_URL || "postgresql://postgres:hafsaAdsfixter@3@localhost:5432/shelflock?schema=public";

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

// আপনার আসল লাইভ ডাটাবেজ লিংক
const LIVE_URL = "postgresql://postgres:hafsaAdsfixter@3@localhost:5432/shelflock?schema=public";

const pool = new pg.Pool({ 
  connectionString: LIVE_URL,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

// 🚨 [ম্যাজিক লাইন]: গ্লোবাল মেমোরি বা আগের সব অবজেক্ট পুরোপুরি ডিলিট করে ফ্রেশ ক্লায়েন্ট তৈরি
const databaseClient = new PrismaClient({ adapter });

export const prisma = databaseClient;

// 🎯 getPrisma() ফাংশন কল হলে যেন কোনোভাবেই ডিফল্ট ক্লায়েন্ট রিটার্ন না করে
export const getPrisma = () => {
  return databaseClient;
};