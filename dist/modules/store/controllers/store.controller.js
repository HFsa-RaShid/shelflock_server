import { StoreService } from '../services/store.service.js';
// ১. স্টোর তৈরি করার কন্ট্রোলার (আপাতত টোকেন ছাড়া টেস্ট করার জন্য)
const createStore = async (req, res) => {
    try {
        const { name, phone, merchantId } = req.body;
        if (!merchantId) {
            res.status(400).json({ success: false, message: 'Merchant ID is required for testing!' });
            return;
        }
        if (!name || !phone) {
            res.status(400).json({ success: false, message: 'স্টোরের নাম এবং ফোন নম্বর দেওয়া আবশ্যিক!' });
            return;
        }
        const result = await StoreService.createStoreInDB({ name, phone, merchantId });
        res.status(201).json({
            success: true,
            message: 'অভিনন্দন! আপনার স্টোরটি সফলভাবে তৈরি হয়েছে।',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ২. মার্চেন্টের সব স্টোর দেখার কন্ট্রোলার
const getMyStores = async (req, res) => {
    try {
        // GET রিকোয়েস্টে কোয়েরি অথবা বডি থেকে merchantId নিচ্ছি
        const merchantId = req.query.merchantId || req.body.merchantId;
        if (!merchantId) {
            res.status(400).json({ success: false, message: 'Merchant ID পাওয়া যায়নি!' });
            return;
        }
        const result = await StoreService.getMerchantStoresFromDB(merchantId);
        res.status(200).json({
            success: true,
            message: 'স্টোর লিস্ট সফলভাবে পাওয়া গেছে।',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ৩. স্টোর আপডেট করার কন্ট্রোলার
const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await StoreService.updateStoreInDB(id, req.body);
        res.status(200).json({ success: true, message: 'Store updated successfully', data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ৪. স্টোর ডিলিট করার কন্ট্রোলার
const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        await StoreService.deleteStoreFromDB(id);
        res.status(200).json({ success: true, message: 'Store deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const StoreController = {
    createStore,
    getMyStores,
    updateStore,
    deleteStore,
};
//# sourceMappingURL=store.controller.js.map