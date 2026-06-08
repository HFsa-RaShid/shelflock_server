import { IMerchantLoginInput, IMerchantRegisterInput } from '../interfaces/auth.interface.js';
export declare class AuthService {
    private prisma;
    private JWT_SECRET;
    register(data: IMerchantRegisterInput): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
    }>;
    login(data: IMerchantLoginInput): Promise<{
        token: string;
        merchant: {
            id: string;
            name: string;
            email: string;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map