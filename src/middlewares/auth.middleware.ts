
import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../modules/auth/interfaces/auth.interface.js';

export const verifyToken = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'লগইন করুন!' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
    
    req.merchant = decoded; 
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'টোকেন সঠিক নয়!' });
  }
};