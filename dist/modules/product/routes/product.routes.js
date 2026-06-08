import express from 'express';
import { ProductController } from '../controllers/product.controller.js';
const router = express.Router();
router.post('/create-product', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map