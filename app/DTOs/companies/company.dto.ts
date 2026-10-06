import { CompanyCustomerDto, CustomerDto } from "../customers/customer.dto";
import { CustomerOrderDto } from "../orders/order.dto";

export type CreateCompanyDto = {
  name: string;
  phone: string | null;
  email: string | null;
};

export type UpdateCompanyDto = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
};

export type CompanyDto = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  status: boolean;
  createdAt: Date;
  customers: CompanyCustomerDto[];
  orders: CustomerOrderDto[];
};

export type CompanyQueryDto = {
  search: string | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
