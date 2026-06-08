// src/modules/store/services/store.service.ts
import { getPrisma } from '../../../config/prisma.js';
// ১. নতুন স্টোর তৈরি করা
const createStoreInDB = async (data) => {
    const prisma = getPrisma();
    return await prisma.store.create({
        data,
    });
};
// ২. নির্দিষ্ট মার্চেন্টের সব স্টোর নিয়ে আসা (প্রোডাক্ট কাউন্টসহ)
const getMerchantStoresFromDB = async (merchantId) => {
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
// ৩. স্টোর আপডেট করা
const updateStoreInDB = async (id, data) => {
    const prisma = getPrisma();
    return await prisma.store.update({
        where: { id },
        data,
    });
};
// ৪. স্টোর ডিলিট করা
const deleteStoreFromDB = async (id) => {
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
//# sourceMappingURL=store.service.js.map