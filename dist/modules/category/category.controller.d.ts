import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
    headers: {
        'store-id'?: string;
    } & Request['headers'];
}
export declare const CategoryController: {
    createCategory: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getAllCategories: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    toggleCategoryStatus: (req: Request, res: Response) => Promise<void>;
    deleteCategory: (req: Request, res: Response) => Promise<void>;
};
export {};
//# sourceMappingURL=category.controller.d.ts.map