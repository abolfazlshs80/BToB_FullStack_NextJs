export type OrderReportDto = {
  orderId: number;
  orderName: string | null;

  customerName: string;
  companyName: string;

  orderTotal: number;
  orderStatus: string;

  itemCount: number;

  paidAmount: number;
  remainingAmount: number;

  createdAt: Date;
};

export type OrderReportFilterDto = {
  search?: string;
  status?: string;
  companyId?: number;
  fromDate?: Date;
  toDate?: Date;
};

export type MonthlyOrderReportDto = {
  month: string;
  orderCount: number;
  totalSales: number;
};
