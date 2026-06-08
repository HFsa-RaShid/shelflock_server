import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';


const authService = new AuthService();

export class AuthController {
  // 📝 রেজিস্টার কন্ট্রোলার
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ success: false, message: 'সবগুলো ফিল্ড পূরণ করুন!' });
        return;
      }

      const result = await authService.register({ name, email, password });
      res.status(201).json({
        success: true,
        message: 'মার্চেন্ট অ্যাকাউন্ট তৈরি সফল হয়েছে!',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // 🔑 লগইন কন্ট্রোলার
  // async login(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { email, password } = req.body;

  //     if (!email || !password) {
  //       res.status(400).json({ success: false, message: 'ইমেইল এবং পাসওয়ার্ড দিন!' });
  //       return;
  //     }

  //     const result = await authService.login({ email, password });
  //     res.status(200).json({
  //       success: true,
  //       message: 'লগইন সফল হয়েছে!',
  //       ...result,
  //     });
  //   } catch (error: any) {
  //     res.status(401).json({ success: false, message: error.message });
  //   }
  // }


  // 🔑 লগইন কন্ট্রোলার
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, message: 'ইমেইল এবং পাসওয়ার্ড দিন!' });
        return;
      }

      const result = await authService.login({ email, password });
      res.status(200).json({
        success: true,
        message: 'লগইন সফল হয়েছে!',
        ...result,
      });
    } catch (error: any) {
      // 💡 [IMPORTANT DEBUG LOG]: এটি Vercel-এর Logs-এ আসল অপরাধীকে দেখাবে
      console.error("--- LOGIN SERVICE CRASHED ---", error); 
      
      // আসল এরর যদি ৪MDE না হয়ে ৫০০ (সার্ভার ক্র্যাশ) হয়, তবে যেন সেটাই দেখায়
      const statusCode = error.status || 401; 
      res.status(statusCode).json({ success: false, message: error.message });
    }
  }

  // 🚪 লগআউট কন্ট্রোলার
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // ফ্রন্টএন্ড লেভেল কুকি ক্লিয়ারের ব্যাকআপ হিসেবে সার্ভার সাইড থেকেও ডিলিট করার চেষ্টা করা হচ্ছে
      res.clearCookie('token', {
        path: '/'
      });

      res.status(200).json({
        success: true,
        message: 'লগআউট সফল হয়েছে!',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'সার্ভার এরর!'
      });
    }
  }
}