import express from 'express';
import { AlertRuleController } from './alert.controller.js';
const router = express.Router();
router.post('/', AlertRuleController.saveAlertRule);
router.get('/', AlertRuleController.getAlertRule);
export const AlertRuleRoutes = router;
//# sourceMappingURL=alert.routes.js.map