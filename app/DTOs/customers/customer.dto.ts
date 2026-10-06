export type CreateCustomerDto = {
  name: string;
  phone: string | null;
  email: string | null;
  companyId: number | null;
};

export type UpdateCustomerDto = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
};

export type CustomerDto = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt: Date;
  companyId: number | null;
};

export type CompanyCustomerDto = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  createdAt: Date;
};

export type CustomerQueryDto = {
  search: string | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
