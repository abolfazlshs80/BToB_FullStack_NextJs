import prisma from "@/lib/prisma";
import { CreateOrderDto } from "../DTOs/orders/order.dto";

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
