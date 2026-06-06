import { getPrisma } from "../../config/prisma.js";
import { IAlertRuleInput } from "./alert.interface.js";


const saveAlertRuleIntoDB = async (storeId: string, data: IAlertRuleInput) => {
  const prisma = getPrisma();
  
 
  return await prisma.alertRule.upsert({
    where: { storeId },
    update: {
      intervals: data.intervals,
      customMessage: data.customMessage,
      whatsappNumber: data.whatsappNumber,
      channels: data.channels,
    },
    create: {
      storeId,
      intervals: data.intervals,
      customMessage: data.customMessage,
      whatsappNumber: data.whatsappNumber,
      channels: data.channels,
    },
  });
};

const getAlertRuleFromDB = async (storeId: string) => {
  const prisma = getPrisma();
  return await prisma.alertRule.findUnique({
    where: { storeId },
  });
};

export const AlertRuleService = {
  saveAlertRuleIntoDB,
  getAlertRuleFromDB,
};