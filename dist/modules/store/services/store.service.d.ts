import { ICreateStoreInput, IUpdateStoreInput } from '../interfaces/store.interface.js';
export declare const StoreService: {
    createStoreInDB: (data: ICreateStoreInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string;
        merchantId: string;
    }>;
    getMerchantStoresFromDB: (merchantId: string) => Promise<({
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        phone: string;
        merchantId: string;
    })[]>;
    updateStoreInDB: (id: string, data: IUpdateStoreInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string;
        merchantId: string;
    }>;
    deleteStoreFromDB: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        phone: string;
        merchantId: string;
    }>;
};
//# sourceMappingURL=store.service.d.ts.map