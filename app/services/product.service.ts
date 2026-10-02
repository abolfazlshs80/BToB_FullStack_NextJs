import prisma from "@/lib/prisma";
import {
  CreateProductDto,
  PatchProductDto,
  ProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from "../DTOs/Products/product.dto";

export async function getProducts(
  query?: ProductQueryDto,
): Promise<ProductDto[]> {
  const products = await prisma.product.findMany({
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

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    createdAt: product.createdAt,
  }));
}

export async function getProductById(id: number): Promise<ProductDto | null> {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    createdAt: product.createdAt,
  };
}

export async function createProduct(
  dto: CreateProductDto,
): Promise<ProductDto> {
  const product = await prisma.product.create({
    data: {
      name: dto.name,
      price: dto.price,
    },
  });

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    createdAt: product.createdAt,
  };
}

export async function updateProduct(
  dto: UpdateProductDto,
): Promise<ProductDto> {
  const product = await prisma.product.update({
    where: {
      id: dto.id,
    },
    data: {
      name: dto.name,
      price: dto.price,
    },
  });

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    createdAt: product.createdAt,
  };
}

export async function patchProduct(dto: PatchProductDto): Promise<ProductDto> {
  const product = await prisma.product.update({
    where: {
      id: dto.id,
    },
    data: {
      ...(dto.name !== undefined && {
        name: dto.name,
      }),

      ...(dto.price !== undefined && {
        price: dto.price,
      }),
    },
  });

  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    createdAt: product.createdAt,
  };
}

export async function deleteProduct(id: number) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}
