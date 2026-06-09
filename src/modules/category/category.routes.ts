
import express from 'express';
import { CategoryController } from './category.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/create-category',verifyToken, CategoryController.createCategory);
router.get('/',verifyToken, CategoryController.getAllCategories);
router.patch('/:id', CategoryController.toggleCategoryStatus);
router.delete('/:id', CategoryController.deleteCategory);

export default router;