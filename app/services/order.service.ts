import prisma from "@/lib/prisma";
import { CreateOrderDto, OrderSelectDto } from "../DTOs/orders/order.dto";

export async function createOrder(data: CreateOrderDto) {
  return prisma.$transaction(async (tx) => {
    const productIds = data.items.map((item) => item.productId);

    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        status: true,
      },
    });

    if (products.length !== data.items.length) {
      throw new Error("برخی از محصولات معتبر نیستند.");
    }

    let totalPrice = 0;

    const orderItems = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error("محصول پیدا نشد.");
      }

      const price = Number(product.price);

      totalPrice += price * item.quantity;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const order = await tx.order.create({
      data: {
        name: "تستی",
        customerId: data.customerId,
        status: data.status,
        totalPrice,
        items: {
          create: orderItems,
        },
      },
    });

    return order;
  });
}
export async function deleteOrder(id: number) {
  return prisma.order.delete({
    where: {
      id,
    },
  });
}

export async function updateOrder(
  id: number,
  data: {
    name: string;

    status: string;
  },
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      status: data.status,
    },
  });
}

export async function getPaymentsForOrder(): Promise<OrderSelectDto[]> {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return orders.map((order) => ({
    id: order.id,
    name: order.name,
    customerName: order.customer.name,
    totalPrice: Number(order.totalPrice),
  }));
}
