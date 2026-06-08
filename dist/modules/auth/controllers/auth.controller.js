import { AuthService } from '../services/auth.service.js';
const authService = new AuthService();
export class AuthController {
    // 📝 রেজিস্টার কন্ট্রোলার
    async register(req, res) {
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
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    // 🔑 লগইন কন্ট্রোলার
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ success: false, message: 'ইমেইল এবং পাসওয়ার্ড দিন!' });
                return;
            }
            const result = await authService.login({ email, password });
            res.status(200).json({
                success: true,
                message: 'লগইন সফল হয়েছে!',
                ...result,
            });
        }
        catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
    // 🚪 লগআউট কন্ট্রোলার
    async logout(req, res) {
        try {
            // ফ্রন্টএন্ড লেভেল কুকি ক্লিয়ারের ব্যাকআপ হিসেবে সার্ভার সাইড থেকেও ডিলিট করার চেষ্টা করা হচ্ছে
            res.clearCookie('token', {
                path: '/'
            });
            res.status(200).json({
                success: true,
                message: 'লগআউট সফল হয়েছে!',
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || 'সার্ভার এরর!'
            });
        }
    }
}
//# sourceMappingURL=auth.controller.js.map