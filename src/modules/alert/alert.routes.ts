import express from 'express';
import { AlertRuleController } from './alert.controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/',verifyToken, AlertRuleController.saveAlertRule);
router.get('/',verifyToken, AlertRuleController.getAlertRule);

export const AlertRuleRoutes = router;