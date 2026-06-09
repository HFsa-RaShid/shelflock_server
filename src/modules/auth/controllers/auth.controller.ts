import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';


const authService = new AuthService();

export class AuthController {

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
      
      const statusCode = error.status || 401; 
      res.status(statusCode).json({ success: false, message: error.message });
    }
  }


  async logout(req: Request, res: Response): Promise<void> {
    try {

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