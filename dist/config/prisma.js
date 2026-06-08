// src/config/prisma.ts
import 'dotenv/config'; // <--- এই লাইনটি একদম উপরে যোগ করুন
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const connectionString = process.env.DATABASE_URL;
// ইউআরএলটি ঠিকঠাক পাচ্ছে কিনা তা নিশ্চিত করার জন্য একটি ছোট সেফটি চেক
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in your environment variables!");
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
export const getPrisma = () => {
    return prisma;
};
//# sourceMappingURL=prisma.js.map