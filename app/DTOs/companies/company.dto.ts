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
};

export type CompanyQueryDto = {
  search: string | undefined;
  pageSize: number | undefined;
  page: number | undefined;
};
