import { getPrisma } from '../../../config/prisma.js';
import { IProductInput, IProductUpdateInput } from '../interfaces/product.interface.js';

// ১. Create Product
const createProductIntoDB = async (data: IProductInput) => {
  const prisma = getPrisma();
  return await prisma.product.create({
    data: {
      title: data.title,
      lotNumber: data.lotNumber || null,
      quantity: Number(data.quantity),
      expiryDate: new Date(data.expiryDate),
      alertDaysBefore: data.alertDaysBefore ? Number(data.alertDaysBefore) : 15,
      storeId: data.storeId,
      categoryId: data.categoryId || null,
      status: data.status || 'Active',
    },
    include: {
      category: { select: { name: true } }, 
    }
  });
};

// ২. Read All Products 
const getAllProductsFromDB = async (storeId: string) => {
  const prisma = getPrisma();
  return await prisma.product.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

// ৩. Read Single Product by ID
const getSingleProductFromDB = async (id: string) => {
  const prisma = getPrisma();
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { name: true } },
    },
  });
};

// ৪. Update Product
const updateProductInDB = async (id: string, data: IProductUpdateInput) => {
  const prisma = getPrisma();
  
  const updateData: any = { ...data };
  if (data.quantity !== undefined) updateData.quantity = Number(data.quantity);
  if (data.expiryDate) updateData.expiryDate = new Date(data.expiryDate);
  if (data.alertDaysBefore) updateData.alertDaysBefore = Number(data.alertDaysBefore);
  
  if (data.status) updateData.status = data.status; 

  return await prisma.product.update({
    where: { id },
    data: updateData,
    include: {
      category: { select: { name: true } },
    },
  });
};

// ৫. Delete Product
const deleteProductFromDB = async (id: string) => {
  const prisma = getPrisma();
  return await prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};