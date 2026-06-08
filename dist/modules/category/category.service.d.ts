import { ICreateCategoryInput, IUpdateCategoryInput } from './category.interface.js';
export declare const CategoryService: {
    createCategoryIntoDB: (data: ICreateCategoryInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.Status;
        storeId: string;
        description: string | null;
        updatedAt: Date;
    }>;
    getAllCategoriesFromDB: (storeId: string) => Promise<({
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.Status;
        storeId: string;
        description: string | null;
        updatedAt: Date;
    })[]>;
    updateCategoryInDB: (id: string, updateData: IUpdateCategoryInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.Status;
        storeId: string;
        description: string | null;
        updatedAt: Date;
    }>;
    deleteCategoryFromDB: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.Status;
        storeId: string;
        description: string | null;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map