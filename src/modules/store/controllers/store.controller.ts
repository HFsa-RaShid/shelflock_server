import { Response } from 'express';
import { IAuthRequest } from '../../auth/interfaces/auth.interface.js';
import { StoreService } from '../services/store.service.js';


const storeService = new StoreService();

export class StoreController {
  // 🏪 স্টোর তৈরি করার কন্ট্রোলার
  async createStore(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const { name, phone } = req.body;
      const merchantId = req.merchant?.id; // 👈 মিডলওয়্যার থেকে মার্চেন্ট আইডি নেওয়া হলো

      if (!merchantId) {
        res.status(401).json({ success: false, message: 'অননুমোদিত রিকোয়েস্ট, দয়া করে আবার লগইন করুন।' });
        return;
      }

      if (!name || !phone) {
        res.status(400).json({ success: false, message: 'স্টোরের নাম এবং ফোন নম্বর দেওয়া আবশ্যিক!' });
        return;
      }

      const result = await storeService.createStore({ name, phone, merchantId });
      
      res.status(201).json({
        success: true,
        message: 'অভিনন্দন! আপনার স্টোরটি সফলভাবে তৈরি হয়েছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // 📋 মার্চেন্টের সব স্টোর দেখার কন্ট্রোলার
  async getMyStores(req: IAuthRequest, res: Response): Promise<void> {
    try {
      const merchantId = req.merchant?.id;

      if (!merchantId) {
        res.status(401).json({ success: false, message: 'লগইন সেশন শেষ হয়ে গেছে!' });
        return;
      }

      const result = await storeService.getMerchantStores(merchantId);
      
      res.status(200).json({
        success: true,
        message: 'স্টোর লিস্ট সফলভাবে পাওয়া গেছে।',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}