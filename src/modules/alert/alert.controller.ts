import { Request, Response } from 'express';
import { AlertRuleService } from './alert.service.js';


interface AuthenticatedRequest extends Request {
  headers: {
    'store-id'?: string;
  } & Request['headers'];
}

const saveAlertRule = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const storeId = req.headers['store-id'];
    if (!storeId) {
      res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
      return;
    }

    const result = await AlertRuleService.saveAlertRuleIntoDB(storeId, req.body);
    res.status(200).json({
      success: true,
      message: 'Alert configuration saved successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAlertRule = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const storeId = req.headers['store-id'];
    if (!storeId) {
      res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
      return;
    }

    const result = await AlertRuleService.getAlertRuleFromDB(storeId);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const AlertRuleController = {
  saveAlertRule,
  getAlertRule,
};