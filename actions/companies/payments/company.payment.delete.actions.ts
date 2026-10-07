"use server";

import { deletePayment } from "@/app/services/payment.service";
import { revalidatePath } from "next/cache";

export async function deletePaymentAction(id: number, companyId: number) {
  await deletePayment(id);

  revalidatePath("/admin/companies/" + companyId);

  return {
    success: true,
  };
}
