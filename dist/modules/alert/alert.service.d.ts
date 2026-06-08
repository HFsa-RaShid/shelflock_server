import { IAlertRuleInput } from "./alert.interface.js";
export declare const AlertRuleService: {
    saveAlertRuleIntoDB: (storeId: string, data: IAlertRuleInput) => Promise<{
        id: string;
        createdAt: Date;
        storeId: string;
        updatedAt: Date;
        intervals: number[];
        customMessage: string;
        whatsappNumber: string | null;
        channels: string[];
    }>;
    getAlertRuleFromDB: (storeId: string) => Promise<{
        id: string;
        createdAt: Date;
        storeId: string;
        updatedAt: Date;
        intervals: number[];
        customMessage: string;
        whatsappNumber: string | null;
        channels: string[];
    } | null>;
};
//# sourceMappingURL=alert.service.d.ts.map