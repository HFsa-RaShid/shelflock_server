import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    headers: {
        'store-id'?: string;
    } & Request['headers'];
}
export declare const ProductController: {
    createProduct: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getAllProducts: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getSingleProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
};
export {};
//# sourceMappingURL=product.controller.d.ts.map