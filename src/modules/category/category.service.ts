

import { getPrisma } from '../../config/prisma.js';
import { ICreateCategoryInput, IUpdateCategoryInput } from './category.interface.js';



const createCategoryIntoDB = async (data: ICreateCategoryInput) => {
  const prisma = getPrisma();
  return await prisma.category.create({
    data,
  });
};


const getAllCategoriesFromDB = async (storeId: string) => {
  const prisma = getPrisma();
  return await prisma.category.findMany({
    where: {
      storeId,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};


const updateCategoryInDB = async (id: string, updateData: IUpdateCategoryInput) => {
  const prisma = getPrisma();
  return await prisma.category.update({
    where: { id },
    data: updateData,
  });
};


const deleteCategoryFromDB = async (id: string) => {
  const prisma = getPrisma();
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
};