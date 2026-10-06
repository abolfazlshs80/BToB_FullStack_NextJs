"use server";

import { deleteCustomer } from "@/app/services/customer.service";
import { revalidatePath } from "next/cache";

export async function deleteCustomerAction(id: number, companyId: number) {
  await deleteCustomer(id);

  revalidatePath("/admin/companies/" + companyId);

  return {
    success: true,
  };
}
