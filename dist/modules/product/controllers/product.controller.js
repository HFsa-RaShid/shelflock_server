import { ProductService } from '../services/product.service.js';
// ১. Create Product
const createProduct = async (req, res) => {
    try {
        const storeId = req.headers['store-id'];
        if (!storeId) {
            res.status(400).json({ success: false, message: 'Store ID is required in headers' });
            return;
        }
        const productData = { ...req.body, storeId };
        const result = await ProductService.createProductIntoDB(productData);
        res.status(201).json({ success: true, message: 'Product added successfully into shelf', data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ২. Get All Products
const getAllProducts = async (req, res) => {
    try {
        const storeId = req.headers['store-id'];
        if (!storeId) {
            res.status(400).json({ success: false, message: 'Store ID is required in headers' });
            return;
        }
        const result = await ProductService.getAllProductsFromDB(storeId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ৩. Get Single Product
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductService.getSingleProductFromDB(id);
        if (!result) {
            res.status(404).json({ success: false, message: 'Product not found on shelf' });
            return;
        }
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ৪. Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductService.updateProductInDB(id, req.body);
        res.status(200).json({ success: true, message: 'Product updated successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// ۵. Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProductFromDB(id);
        res.status(200).json({ success: true, message: 'Product removed from shelf successfully' });
    }
    catch (error) {
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
//# sourceMappingURL=product.controller.js.map