import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { verifyToken } from '../../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-product',verifyToken, ProductController.createProduct);
router.get('/',verifyToken, ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;