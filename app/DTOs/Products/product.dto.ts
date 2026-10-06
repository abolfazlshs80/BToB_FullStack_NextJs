export type CreateProductDto = {
  name: string;
  price: number;
};

export type UpdateProductDto = {
  id: number;
  name: string;
  price: number;
};

export type PatchProductDto = {
  id: number;
  name?: string;
  price?: number;
};
export type ProductDto = {
  id: number;
  name: string;
  price: number;
  status: boolean;
  createdAt: Date;
};

export type ProductQueryDto = {
  search: string | undefined;
  price: number | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
export type ProductSelectDto = {
  id: number;
  name: string;
  price: number;
};