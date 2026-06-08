import { Response, NextFunction } from 'express';
import { IAuthRequest } from '../modules/auth/interfaces/auth.interface.js';
export declare const verifyToken: (req: IAuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map