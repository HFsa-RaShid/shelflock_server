import { getPrisma } from "../../../config/prisma.js";
import { ICreateStoreInput } from "../interfaces/store.interface.js";


export class StoreService {
  private prisma = getPrisma();

  // 🏪 ১. নতুন স্টোর তৈরি করা
  async createStore(data: ICreateStoreInput) {
    const newStore = await this.prisma.store.create({
      data: {
        name: data.name,
        phone: data.phone,
        merchantId: data.merchantId,
      },
    });
    return newStore;
  }

  // 📋 ২. লগইন করা নির্দিষ্ট মার্চেন্টের সব স্টোর নিয়ে আসা
  async getMerchantStores(merchantId: string) {
    const stores = await this.prisma.store.findMany({
      where: {
        merchantId: merchantId,
      },
      include: {
        _count: {
          select: { products: true }, // স্টোরে কয়টা প্রোডাক্ট আছে তাও একসাথে কাউন্ট করে নিয়ে আসবে
        },
      },
    });
    return stores;
  }
}