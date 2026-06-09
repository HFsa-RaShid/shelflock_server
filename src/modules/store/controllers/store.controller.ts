import { Request, Response } from 'express';
import { StoreService } from '../services/store.service.js';


const createStore = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getMyStores = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const merchantId = (req.query.merchantId as string) || req.body.merchantId;

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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await StoreService.updateStoreInDB(id as string, req.body);
    res.status(200).json({ success: true, message: 'Store updated successfully', data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await StoreService.deleteStoreFromDB(id as string);
    res.status(200).json({ success: true, message: 'Store deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const StoreController = {
  createStore,
  getMyStores,
  updateStore,
  deleteStore,
};