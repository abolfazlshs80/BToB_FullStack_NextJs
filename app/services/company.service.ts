import prisma from "@/lib/prisma";
import {
  CompanyDto,
  CompanyQueryDto,
  CompanySelectDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../DTOs/companies/company.dto";

export async function getCompanys(
  query?: CompanyQueryDto,
): Promise<CompanyDto[]> {
  const companys = await prisma.company.findMany({
    where: query?.search
      ? {
          name: {
            contains: query.search,
          },
        }
      : undefined,

    orderBy: {
      id: "desc",
    },

    skip:
      query?.page && query?.pageSize
        ? (query.page - 1) * query.pageSize
        : undefined,

    take: query?.pageSize,
  });

  return companys.map((company) => ({
    id: company.id,
    name: company.name,
    status: company.status,
    email: company.email,
    phone: company.phone,
    customers: [],
    payments: [],
    orders: [],
    createdAt: company.createdAt,
  }));
}

export async function getCompanyById(id: number): Promise<CompanyDto | null> {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    include: {
      customers: {
        include: {
          orders: {
            include: {
              payments: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    return null;
  }

  return {
    id: company.id,
    name: company.name,
    phone: company.phone,
    email: company.email,
    status: company.status,
    createdAt: company.createdAt,

    customers: company.customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      createdAt: customer.createdAt,
    })),

    orders: company.customers.flatMap((customer) =>
      customer.orders.map((order) => ({
        id: order.id,
        name: order.name,
        customerId: order.customerId,
        customerName: customer.name,
        totalPrice: Number(order.totalPrice),
        status: order.status,
        createdAt: order.createdAt,
      })),
    ),

    payments: company.customers.flatMap((customer) =>
      customer.orders.flatMap((order) =>
        order.payments.map((payment) => ({
          id: payment.id,
          orderId: order.id,
          orderName: order.name,
          customerId: customer.id,
          customerName: customer.name,
          amount: Number(payment.amount),
          status: payment.status,
          method: payment.method,
          createdAt: payment.createdAt,
        })),
      ),
    ),
  };
}
export async function createCompany(
  dto: CreateCompanyDto,
): Promise<CompanyDto> {
  const company = await prisma.company.create({
    data: {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    },
  });

  return {
    id: company.id,
    name: company.name,
    status: company.status,
    phone: company.phone,
    email: company.email,
    customers: [],
    orders: [],
    payments: [],
    createdAt: company.createdAt,
  };
}

export async function updateCompany(
  dto: UpdateCompanyDto,
): Promise<CompanyDto> {
  const company = await prisma.company.update({
    where: {
      id: dto.id,
    },
    data: {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    },
  });

  return {
    id: company.id,
    name: company.name,
    status: company.status,
    phone: company.phone,
    email: company.email ?? "",
    customers: [],
    orders: [],
    payments: [],
    createdAt: company.createdAt,
  };
}

// export async function patchCompany(dto: PatchCompanyDto): Promise<CompanyDto> {
//   const company = await prisma.company.update({
//     where: {
//       id: dto.id,
//     },
//     data: {
//       ...(dto.name !== undefined && {
//         name: dto.name,
//       }),

//       ...(dto.price !== undefined && {
//         price: dto.price,
//       }),
//     },
//   });

//   return {
//     id: company.id,
//     name: company.name,
//       status: company.status,
//     price: Number(company.price),
//     createdAt: company.createdAt,
//   };
// }

export async function deleteCompany(id: number) {
  return prisma.company.delete({
    where: {
      id,
    },
  });
}

export async function toggleCompanyStatus(id: number) {
  const company = await prisma.company.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
    },
  });

  if (!company) {
    throw new Error("شرکت پیدا نشد");
  }

  return prisma.company.update({
    where: { id },
    data: {
      status: !company.status,
    },
    select: {
      id: true,
      status: true,
    },
  });
}

export async function getCompaniesForSelect(): Promise<CompanySelectDto[]> {
  return prisma.company.findMany({
    where: {
      status: true,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}
