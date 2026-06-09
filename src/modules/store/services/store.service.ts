
import { getPrisma } from '../../../config/prisma.js';
import { ICreateStoreInput, IUpdateStoreInput } from '../interfaces/store.interface.js';


const createStoreInDB = async (data: ICreateStoreInput) => {
  const prisma = getPrisma();
  return await prisma.store.create({
    data,
  });
};


const getMerchantStoresFromDB = async (merchantId: string) => {
  const prisma = getPrisma();
  return await prisma.store.findMany({
    where: {
      merchantId,
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


const updateStoreInDB = async (id: string, data: IUpdateStoreInput) => {
  const prisma = getPrisma();
  return await prisma.store.update({
    where: { id },
    data,
  });
};


const deleteStoreFromDB = async (id: string) => {
  const prisma = getPrisma();
  return await prisma.store.delete({
    where: { id },
  });
};

export const StoreService = {
  createStoreInDB,
  getMerchantStoresFromDB,
  updateStoreInDB,
  deleteStoreFromDB,
};