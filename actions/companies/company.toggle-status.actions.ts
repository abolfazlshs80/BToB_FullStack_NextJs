"use server";

import { revalidatePath } from "next/cache";

import { toggleCompanyStatus } from "@/app/services/company.service";
import { redirect } from "next/navigation";

export async function toggleCompanyStatusAction(id: number) {
  await toggleCompanyStatus(id);

  revalidatePath("/admin/companies");

  redirect("/admin/companies");

  return {
    success: true,
  };
}
