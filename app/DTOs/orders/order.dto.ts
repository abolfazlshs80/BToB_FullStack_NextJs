export type CreateOrderDto = {
  name: string;
  status: string | null;
  totalPrice: number | null;
  customerId: number | null;
};

export type UpdateOrderDto = {
  id: number;
  name: string;
  status: string | null;
  totalPrice: number | null;
};

export type OrderDto = {
  id: number;
  name: string;
  status: string | null;
  totalPrice: number | null;
  createdAt: Date;
  customerId: number | null;
};

export type CustomerOrderDto = {
  id: number;
  name: string;
  status: string | null;
  totalPrice: number | null;
  createdAt: Date;
};

export type OrderQueryDto = {
  search: string | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
