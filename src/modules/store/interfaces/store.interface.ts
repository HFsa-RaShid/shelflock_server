// src/modules/store/interfaces/store.interface.ts
export interface ICreateStoreInput {
  name: string;
  phone: string;
  merchantId: string;
}

export interface IUpdateStoreInput {
  name?: string;
  phone?: string;
}