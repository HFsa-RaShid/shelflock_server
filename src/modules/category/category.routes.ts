// src/modules/category/routes/category.routes.ts
import express from 'express';
import { CategoryController } from './category.controller.js';


const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.patch('/:id', CategoryController.toggleCategoryStatus);
router.delete('/:id', CategoryController.deleteCategory);

export default router;