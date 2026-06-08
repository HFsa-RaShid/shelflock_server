import { IProductInput, IProductUpdateInput } from '../interfaces/product.interface.js';
export declare const ProductService: {
    createProductIntoDB: (data: IProductInput) => Promise<{
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        title: string;
        quantity: number;
        lotNumber: string | null;
        expiryDate: Date;
        alertDaysBefore: number;
        lastAlertedDay: number | null;
        status: import("@prisma/client").$Enums.Status;
        storeId: string | null;
        categoryId: string | null;
    }>;
    getAllProductsFromDB: (storeId: string) => Promise<({
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        title: string;
        quantity: number;
        lotNumber: string | null;
        expiryDate: Date;
        alertDaysBefore: number;
        lastAlertedDay: number | null;
        status: import("@prisma/client").$Enums.Status;
        storeId: string | null;
        categoryId: string | null;
    })[]>;
    getSingleProductFromDB: (id: string) => Promise<({
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        title: string;
        quantity: number;
        lotNumber: string | null;
        expiryDate: Date;
        alertDaysBefore: number;
        lastAlertedDay: number | null;
        status: import("@prisma/client").$Enums.Status;
        storeId: string | null;
        categoryId: string | null;
    }) | null>;
    updateProductInDB: (id: string, data: IProductUpdateInput) => Promise<{
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        title: string;
        quantity: number;
        lotNumber: string | null;
        expiryDate: Date;
        alertDaysBefore: number;
        lastAlertedDay: number | null;
        status: import("@prisma/client").$Enums.Status;
        storeId: string | null;
        categoryId: string | null;
    }>;
    deleteProductFromDB: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        quantity: number;
        lotNumber: string | null;
        expiryDate: Date;
        alertDaysBefore: number;
        lastAlertedDay: number | null;
        status: import("@prisma/client").$Enums.Status;
        storeId: string | null;
        categoryId: string | null;
    }>;
};
//# sourceMappingURL=product.service.d.ts.map