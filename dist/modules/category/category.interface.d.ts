import { Status } from '@prisma/client';
export interface ICreateCategoryInput {
    name: string;
    description?: string;
    storeId: string;
}
export interface IUpdateCategoryInput {
    name?: string;
    description?: string;
    status?: Status;
}
//# sourceMappingURL=category.interface.d.ts.map