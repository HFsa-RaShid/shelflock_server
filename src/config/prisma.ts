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

// 🚨 [IMPORTANT STEP]: নিচের ডাবল কোটেশনের ("") ভেতর আপনার আসল Supabase বা Neon ডেটাবেজ লিংকটি সরাসরি পেস্ট করে দিন।
// উদাহরণ: "postgresql://postgres.xxxx:your_password@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
const LIVE_DATABASE_URL = "postgresql://postgres:hafsaAdsfixter@3@localhost:5432/shelflock?schema=public";

// Vercel-এর ড্যাশবোর্ডে যদি লিংক ঠিক থাকে তবে সেটা নেবে, না হলে সরাসরি এই লাইভ লিংকটি ব্যাকআপ হিসেবে নেবে
const connectionString = process.env.DATABASE_URL || LIVE_DATABASE_URL;

// একটি অতিরিক্ত সেফটি চেক
if (!connectionString || connectionString.includes('127.0.0.1') || connectionString.includes('localhost')) {
  // যদি কোনো কারণে কোড আবার লোকালহোস্ট রিড করে, তবে সে যেন জোর করে লাইভ লিংকটাই অ্যাসাইন করে
  var finalConnectionString: string = LIVE_DATABASE_URL;
} else {
  var finalConnectionString: string = connectionString;
}

const pool = new pg.Pool({ 
  connectionString: finalConnectionString,
  ssl: { rejectUnauthorized: false } // লাইভ ক্লাউড ডেটাবেজের জন্য SSL বাধ্যতামূলক
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const getPrisma = () => {
  return prisma;
};