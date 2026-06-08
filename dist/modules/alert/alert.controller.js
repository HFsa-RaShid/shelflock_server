import { AlertRuleService } from './alert.service.js';
const saveAlertRule = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const getAlertRule = async (req, res) => {
    try {
        const storeId = req.headers['store-id'];
        if (!storeId) {
            res.status(400).json({ success: false, message: 'Store ID is required in headers.' });
            return;
        }
        const result = await AlertRuleService.getAlertRuleFromDB(storeId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const AlertRuleController = {
    saveAlertRule,
    getAlertRule,
};
//# sourceMappingURL=alert.controller.js.map