export interface ICreateStoreInput {
  name: string;
  phone: string;
  merchantId: string; // এটি আমরা টোকেন (Middleware) থেকে অটোমেটিক বসিয়ে দিব
}