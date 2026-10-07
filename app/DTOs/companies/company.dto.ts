import { CompanyCustomerDto, CustomerDto } from "../customers/customer.dto";
import { CompanyOrderDto } from "../orders/order.dto";
import { CompanyPaymentDto } from "../payments/payment.dto";

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
  orders: CompanyOrderDto[];
  payments: CompanyPaymentDto[];
};

export type CompanyQueryDto = {
  search: string | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
