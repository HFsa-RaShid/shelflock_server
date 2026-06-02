// src/config/routes.ts
import { Router } from 'express';

import productRoutes from '../modules/product/routes/product.routes.js';
import authRoute from '../modules/auth/routes/auth.route.js';
// ভবিষ্যতে স্টোর রাউট আসলে এখানে ইমপোর্ট করবেন, যেমন:
// import storeRoutes from '../modules/store/store.route.js';

const router = Router();

// 💡 মডিউল ভিত্তিক সব রাউটের লিস্ট
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  // {
  //   path: '/stores',
  //   route: storeRoutes,
  // },
];

// লুপ ঘুরিয়ে সব রাউট এক্সপ্রেস রাউটারে রেজিস্টার করা
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;