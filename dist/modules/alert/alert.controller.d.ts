import { Request, Response } from 'express';
interface AuthenticatedRequest extends Request {
    headers: {
        'store-id'?: string;
    } & Request['headers'];
}
export declare const AlertRuleController: {
    saveAlertRule: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getAlertRule: (req: AuthenticatedRequest, res: Response) => Promise<void>;
};
export {};
//# sourceMappingURL=alert.controller.d.ts.map