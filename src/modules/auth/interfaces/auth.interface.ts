export interface IMerchantRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface IMerchantLoginInput {
  email: string;
  password: string;
}
import { Request } from 'express';

export interface IAuthRequest extends Request {
  merchant?: {
    id: string;
    email: string;
  };
}