"use server";

import { createPaymentSchema } from "@/app/schemas/payment.schema";
import { createPayment } from "@/app/services/payment.service";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type PaymentActionState = {
  success: boolean;

  errors?: {
    orderId?: string[];
    amount?: string[];
    status?: string[];
    method?: string[];
  };

  values?: {
    orderId: string;
    amount: string;
    status: string;
    method: string;
    companyId: string;
  };
};

export async function createPaymentAction(
  prevState: PaymentActionState,
  formData: FormData,
): Promise<PaymentActionState> {
  const orderId = String(formData.get("orderId") ?? "");
  const amount = String(formData.get("amount") ?? "");
  const status = String(formData.get("status") ?? "");
  const method = String(formData.get("method") ?? "");
  const companyId = String(formData.get("companyId") ?? "");

  const result = createPaymentSchema.safeParse({
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
        orderId,
        amount,
        status,
        method,
        companyId,
      },
    };
  }

  await createPayment({
    orderId: result.data.orderId,
    amount: result.data.amount,
    status: result.data.status,
    method: result.data.method,
  });

  revalidatePath(`/admin/companies/${companyId}`);

  redirect(`/admin/companies/${companyId}`);
}