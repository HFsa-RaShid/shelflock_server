import { Status } from '@prisma/client';
import { CategoryService } from './category.service.js';
// ১. ক্যাটাগরি তৈরি করুন
const createCategory = async (req, res) => {
    try {
        const storeId = req.headers['store-id'];
        if (!storeId) {
            res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
            return;
        }
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ success: false, message: 'Category name is required.' });
            return;
        }
        const result = await CategoryService.createCategoryIntoDB({
            name,
            description,
            storeId: storeId,
        });
        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
            data: result,
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            res.status(400).json({
                success: false,
                message: 'A category with this name already exists in this store.',
            });
            return;
        }
        res.status(500).json({ success: false, error: error.message });
    }
};
// ২. সমস্ত ক্যাটাগরি নিয়ে আসুন
const getAllCategories = async (req, res) => {
    try {
        const storeId = req.headers['store-id'];
        if (!storeId) {
            res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
            return;
        }
        const categories = await CategoryService.getAllCategoriesFromDB(storeId);
        // 💡 এখানে 'cat: any' অথবা সুনির্দিষ্ট টাইপ ডিফাইন করে TS7006 এররটি ফিক্স করা হয়েছে
        const formattedData = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            status: cat.status,
            itemCount: cat._count?.products || 0, // Optional chaining ব্যবহার করা নিরাপদ
            createdAt: cat.createdAt,
            updatedAt: cat.updatedAt,
        }));
        res.status(200).json({ success: true, data: formattedData });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ৩. ক্যাটাগরি স্ট্যাটাস অ্যাক্টিভ/ইনঅ্যাক্টিভ টগল বা এডিট করুন
const toggleCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, name, description } = req.body;
        // যদি শুধু স্ট্যাটাস আপডেট করতে চায় তবে ভ্যালিডেশন
        if (status && status !== Status.Active && status !== Status.Inactive) {
            res.status(400).json({ success: false, message: 'Invalid status type. Use Active or Inactive.' });
            return;
        }
        const result = await CategoryService.updateCategoryInDB(id, { status, name, description });
        res.status(200).json({
            success: true,
            message: `Category updated successfully.`,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ৪. ক্যাটাগরি ডিলিট করুন
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategoryFromDB(id);
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully. Linked products status set to null.',
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const CategoryController = {
    createCategory,
    getAllCategories,
    toggleCategoryStatus,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map