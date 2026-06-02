import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';


const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.createProductIntoDB(req.body);
    res.status(201).json({ success: true, message: 'Product added successfully', data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB();
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
};