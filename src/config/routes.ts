// src/config/routes.ts
import { Router } from 'express';

import productRoutes from '../modules/product/routes/product.routes.js';
import authRoute from '../modules/auth/routes/auth.route.js';
import categoryRoutes from '../modules/category/category.routes.js';
import storeRoutes from '../modules/store/routes/store.routes.js';
import { AlertRuleRoutes } from '../modules/alert/alert.routes.js';


const router = Router();


const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/stores', 
  route: storeRoutes,
  },
  {
    path: '/categories', 
    route: categoryRoutes,
  },
  {
    path: '/alerts',
    route: AlertRuleRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;