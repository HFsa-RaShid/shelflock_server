export interface IProductInput {
  title: string;
  quantity: number;
  expiryDate: string;
  alertDaysBefore?: number;
  merchantId: string;
}