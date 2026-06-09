import { Router } from 'express';
import { StoreController } from '../controllers/store.controller.js';
import { verifyToken } from '../../../middlewares/auth.middleware.js';

const router = Router();

router.post('/create',verifyToken, StoreController.createStore);
router.get('/my-stores',verifyToken, StoreController.getMyStores);
router.patch('/:id', StoreController.updateStore);
router.delete('/:id', StoreController.deleteStore);

export default router; 