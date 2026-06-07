export interface IProductInput {
  title: string;
  quantity: number;
  lotNumber: string;
  expiryDate: string | Date;
  alertDaysBefore?: number;
  storeId: string;     
  categoryId?: string;   
  status?: 'Active' | 'Inactive'; 
}

export interface IProductUpdateInput {
  title?: string;
  quantity?: number;
  expiryDate?: string | Date;
  alertDaysBefore?: number;
  categoryId?: string;
  lotNumber?: string;
  status?: 'Active' | 'Inactive'; 
}