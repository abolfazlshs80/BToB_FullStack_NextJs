import prisma from "@/lib/prisma";
import {
  CreateCompanyPaymentDto,
  UpdatePaymentDto,
} from "../DTOs/payments/payment.dto";

export async function createPayment(data: CreateCompanyPaymentDto) {
  return prisma.payment.create({
    data: {
      orderId: data.orderId,
      amount: data.amount,
      status: data.status,
      method: data.method,
    },
  });
}
export async function deletePayment(id: number) {
  return prisma.payment.delete({
    where: {
      id,
    },
  });
}

export async function updatePayment(data: UpdatePaymentDto) {
  return prisma.payment.update({
    where: {
      id: data.id,
    },
    data: {
      orderId: data.orderId,
      amount: data.amount,
      status: data.status,
      method: data.method,
    },
  });
}
