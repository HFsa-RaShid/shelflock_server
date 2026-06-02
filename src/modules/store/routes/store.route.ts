import { Router } from 'express';
import { StoreController } from '../controllers/store.controller.js';
import { verifyToken } from '../../../middlewares/auth.middleware.js';


const router = Router();
const storeController = new StoreController();

// 🔒 এই রাউটগুলো সম্পূর্ণ সুরক্ষিত (Protected)
router.post('/create', verifyToken as any, storeController.createStore as any);
router.get('/my-stores', verifyToken as any, storeController.getMyStores as any);

export default router;