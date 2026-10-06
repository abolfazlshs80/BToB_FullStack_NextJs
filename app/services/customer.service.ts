import prisma from "@/lib/prisma";
import {
  CreateCustomerDto,
  CustomerDto,
  CustomerQueryDto,
  UpdateCustomerDto,
} from "../DTOs/customers/customer.dto";

export async function getCustomers(
  query?: CustomerQueryDto,
): Promise<CustomerDto[]> {
  const customers = await prisma.customer.findMany({
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

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    companyId: customer.id,
    email: customer.email,
    phone: customer.phone,
    customers: [],
    createdAt: customer.createdAt,
  }));
}

export async function getCustomerById(id: number): Promise<CustomerDto | null> {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });

  if (!customer) {
    return null;
  }
  console.log(customer);
  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    companyId: customer.id,
    createdAt: customer.createdAt,
  };
}

export async function createCustomer(
  dto: CreateCustomerDto,
): Promise<CustomerDto> {
  const customer = await prisma.customer.create({
    data: {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      companyId: dto.companyId,
    },
  });

  return {
    id: customer.id,
    name: customer.name,
    companyId: customer.id,
    phone: customer.phone,
    email: customer.email,

    createdAt: customer.createdAt,
  };
}

export async function updateCustomer(
  dto: UpdateCustomerDto,
): Promise<CustomerDto> {
  const customer = await prisma.customer.update({
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
    id: customer.id,
    name: customer.name,
    companyId: customer.id,
    phone: customer.phone,
    email: customer.email,
    createdAt: customer.createdAt,
  };
}

// export async function patchCustomer(dto: PatchCustomerDto): Promise<CustomerDto> {
//   const customer = await prisma.customer.update({
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
//     id: customer.id,
//     name: customer.name,
//       status: customer.status,
//     price: Number(customer.price),
//     createdAt: customer.createdAt,
//   };
// }

export async function deleteCustomer(id: number) {
  return prisma.customer.delete({
    where: {
      id,
    },
  });
}

export async function toggleCustomerStatus(id: number) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
    },
  });

  if (!customer) {
    throw new Error("شرکت پیدا نشد");
  }

  return prisma.customer.update({
    where: { id },
    data: {
      status: !customer.status,
    },
    select: {
      id: true,
      status: true,
    },
  });
}
