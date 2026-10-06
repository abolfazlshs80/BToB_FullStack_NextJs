"use server";

import { deleteOrder } from "@/app/services/order.service";
import { revalidatePath } from "next/cache";

export async function deleteOrderAction(id: number, companyId: number) {
  await deleteOrder(id);

  revalidatePath("/admin/companies/" + companyId);

  return {
    success: true,
  };
}
