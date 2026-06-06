// src/modules/category/controllers/category.controller.ts
import { Request, Response } from 'express';
import { Status } from '@prisma/client';
import { CategoryService } from './category.service.js';


interface AuthenticatedRequest extends Request {
  user?: { id: string };
  headers: {
    'store-id'?: string;
  } & Request['headers'];
}

// ১. ক্যাটাগরি তৈরি করুন
const createCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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
      storeId: storeId as string,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: result,
    });
  } catch (error: any) {
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
const getAllCategories = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const storeId = req.headers['store-id'];
    if (!storeId) {
      res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
      return;
    }

    const categories = await CategoryService.getAllCategoriesFromDB(storeId as string);

    const formattedData = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      status: cat.status,
      itemCount: cat._count.products,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    res.status(200).json({ success: true, data: formattedData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৩. ক্যাটাগরি স্ট্যাটাস অ্যাক্টিভ/ইনঅ্যাক্টিভ টগল বা এডিট করুন
const toggleCategoryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, name, description } = req.body;

    // যদি শুধু স্ট্যাটাস আপডেট করতে চায় তবে ভ্যালিডেশন
    if (status && status !== Status.Active && status !== Status.Inactive) {
      res.status(400).json({ success: false, message: 'Invalid status type. Use Active or Inactive.' });
      return;
    }

    const result = await CategoryService.updateCategoryInDB(id as string, { status, name, description });
    res.status(200).json({
      success: true,
      message: `Category updated successfully.`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৪. ক্যাটাগরি ডিলিট করুন
const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await CategoryService.deleteCategoryFromDB(id as string);
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully. Linked products status set to null.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  toggleCategoryStatus,
  deleteCategory,
};