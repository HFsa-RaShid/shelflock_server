// src/modules/category/services/category.service.ts
import { getPrisma } from '../../config/prisma.js';
// ১. নতুন ক্যাটাগরি তৈরি
const createCategoryIntoDB = async (data) => {
    const prisma = getPrisma();
    return await prisma.category.create({
        data,
    });
};
// ২. নির্দিষ্ট স্টোরের সব ক্যাটাগরি তুলে আনা (প্রোডাক্ট কাউন্টসহ)
const getAllCategoriesFromDB = async (storeId) => {
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
// ৩. ক্যাটাগরি ডাটা বা স্ট্যাটাস আপডেট
const updateCategoryInDB = async (id, updateData) => {
    const prisma = getPrisma();
    return await prisma.category.update({
        where: { id },
        data: updateData,
    });
};
// ৪. ক্যাটাগরি ডিলিট করা
const deleteCategoryFromDB = async (id) => {
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
//# sourceMappingURL=category.service.js.map