"use server";

import { revalidatePath } from "next/cache";
import { deleteCompany } from "@/app/services/company.service";

export async function deleteCompanyAction(id: number) {
  await deleteCompany(id);

  revalidatePath("/admin/companies");

  return {
    success: true,
  };
}
