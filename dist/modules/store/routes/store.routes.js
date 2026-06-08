// src/modules/store/routes/store.routes.ts
import { Router } from 'express';
import { StoreController } from '../controllers/store.controller.js';
const router = Router();
router.post('/create', StoreController.createStore);
router.get('/my-stores', StoreController.getMyStores);
router.patch('/:id', StoreController.updateStore);
router.delete('/:id', StoreController.deleteStore);
export default router;
//# sourceMappingURL=store.routes.js.map