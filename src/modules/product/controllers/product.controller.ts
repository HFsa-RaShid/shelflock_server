import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';

interface AuthenticatedRequest extends Request {
  headers: {
    'store-id'?: string;
  } & Request['headers'];
}

// ১. Create Product
const createProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const storeId = req.headers['store-id'];
    if (!storeId) {
      res.status(400).json({ success: false, message: 'Store ID is required in headers' });
      return;
    }

    const productData = { ...req.body, storeId };
    const result = await ProductService.createProductIntoDB(productData);
    
    res.status(201).json({ success: true, message: 'Product added successfully into shelf', data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ২. Get All Products
const getAllProducts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const storeId = req.headers['store-id'];
    if (!storeId) {
      res.status(400).json({ success: false, message: 'Store ID is required in headers' });
      return;
    }

    const result = await ProductService.getAllProductsFromDB(storeId as string);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৩. Get Single Product
const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await ProductService.getSingleProductFromDB(id as string);
    
    if (!result) {
      res.status(404).json({ success: false, message: 'Product not found on shelf' });
      return;
    }
    
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ৪. Update Product
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await ProductService.updateProductInDB(id as string, req.body);
    
    res.status(200).json({ success: true, message: 'Product updated successfully', data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ۵. Delete Product
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await ProductService.deleteProductFromDB(id as string);
    
    res.status(200).json({ success: true, message: 'Product removed from shelf successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};