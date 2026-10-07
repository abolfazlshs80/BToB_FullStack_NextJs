export type CompanyPaymentDto = {
  id: number;
  orderId: number;
  orderName: string | null;
  customerName: string | null;

  amount: number;
  status: string;
  method: string;
  createdAt: Date;
};

export type CreateCompanyPaymentDto = {
  orderId: number;
  amount: number;
  status: string;
  method: string;
};
