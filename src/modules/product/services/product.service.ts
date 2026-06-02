// src/modules/product/services/product.service.ts
// পাথটি আপনার ফোল্ডার অনুযায়ী চেক করে নেবেন
import { getPrisma } from '../../../config/prisma.js';
import { IProductInput } from '../interfaces/product.interface.js';


const createProductIntoDB = async (data: IProductInput) => {
  const prisma = getPrisma(); // 👈 ফাংশনের ভেতরে কল করুন
  return await prisma.product.create({
    data: {
      title: data.title,
      quantity: Number(data.quantity),
      expiryDate: new Date(data.expiryDate),
      alertDaysBefore: data.alertDaysBefore ? Number(data.alertDaysBefore) : 7,
      merchantId: data.merchantId,
    },
  });
};

const getAllProductsFromDB = async () => {
  const prisma = getPrisma(); // 👈 ফাংশনের ভেতরে কল করুন
  return await prisma.product.findMany({
    include: { merchant: { select: { name: true, email: true } } },
  });
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
};