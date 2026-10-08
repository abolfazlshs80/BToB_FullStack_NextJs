"use server";

import { revalidatePath } from "next/cache";

import { updatePaymentSchema } from "@/app/schemas/payment.schema";
import { updatePayment } from "@/app/services/payment.service";

export type PaymentUpdateActionState = {
  success: boolean;

  errors?: {
    orderId?: string[];
    amount?: string[];
    status?: string[];
    method?: string[];
  };

  values?: {
    id: string;
    orderId: string;
    amount: string;
    status: string;
    method: string;
    companyId: string;
  };
};

export async function updatePaymentAction(
  prevState: PaymentUpdateActionState,
  formData: FormData,
): Promise<PaymentUpdateActionState> {
  const id = String(formData.get("id") ?? "");
  const orderId = String(formData.get("orderId") ?? "");
  const amount = String(formData.get("amount") ?? "");
  const status = String(formData.get("status") ?? "");
  const method = String(formData.get("method") ?? "");
  const companyId = String(formData.get("companyId") ?? "");

  const result = updatePaymentSchema.safeParse({
    id: Number(id),
    orderId: Number(orderId),
    amount: Number(amount),
    status,
    method,
  });

  if (!result.success) {
    return {
      success: false,

      errors: result.error.flatten().fieldErrors,

      values: {
        id,
        orderId,
        amount,
        status,
        method,
        companyId,
      },
    };
  }

  await updatePayment({
    id: result.data.id,
    orderId: result.data.orderId,
    amount: result.data.amount,
    status: result.data.status,
    method: result.data.method,
  });

  revalidatePath(`/admin/companies/${companyId}`);

  return {
    success: true,
  };
}