// export type CreateOrderDto = {
//   name: string;
//   status: string | null;
//   totalPrice: number | null;
//   customerId: number | null;
// };

// export type UpdateOrderDto = {
//   id: number;
//   name: string;
//   status: string | null;
//   totalPrice: number | null;
// };

// export type OrderDto = {
//   id: number;
//   name: string;
//   status: string | null;
//   totalPrice: number | null;
//   createdAt: Date;
//   customerId: number | null;
// };

export type CreateOrderItemDto = {
  productId: number;
  quantity: number;
};

export type CreateOrderDto = {
  customerId: number;
  status: string;
  items: CreateOrderItemDto[];
};

export type CompanyOrderDto = {
  id: number;
  name: string | null;
  status: string | null;
  totalPrice: number | null;
  createdAt: Date;
  customerName: string | null;
  customerId: number | null;
};

export interface UpdateOrderDto {
  id: number;
  status: string;
  name: string;
}
export type OrderSelectDto = {
  id: number;
  customerName: string;
  name: string | null;
  totalPrice: number;
};
// export type OrderQueryDto = {
//   search: string | undefined;
//   pageSize: number | undefined;
//   page: number | undefined;
// };
