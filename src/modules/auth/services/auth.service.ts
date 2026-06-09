import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPrisma } from '../../../config/prisma.js';
import { IMerchantLoginInput, IMerchantRegisterInput } from '../interfaces/auth.interface.js';

export class AuthService {
  private prisma = getPrisma();
  private JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';


  async register(data: IMerchantRegisterInput) {
    
    const existingMerchant = await this.prisma.merchant.findUnique({
      where: { email: data.email },
    });

    if (existingMerchant) {
      throw new Error('এই ইমেইলটি দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে!');
    }

    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    
    const newMerchant = await this.prisma.merchant.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...merchantWithoutPassword } = newMerchant;
    return merchantWithoutPassword;
  }


  async login(data: IMerchantLoginInput) {

    const merchant = await this.prisma.merchant.findUnique({
      where: { email: data.email },
    });

    if (!merchant) {
      throw new Error('ভুল ইমেইল অথবা পাসওয়ার্ড!');
    }

  
    const isPasswordMatch = await bcrypt.compare(data.password, merchant.password);
    if (!isPasswordMatch) {
      throw new Error('ভুল ইমেইল অথবা পাসওয়ার্ড!');
    }

    
    const token = jwt.sign(
      { id: merchant.id, email: merchant.email },
      this.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      merchant: {
        id: merchant.id,
        name: merchant.name,
        email: merchant.email,
      },
    };
  }
}