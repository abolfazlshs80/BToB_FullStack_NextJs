"use server";

import { createCompanySchema } from "@/app/schemas/company.schema";
import { createCompany } from "@/app/services/company.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CompanyActionState = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];

  };
  values?: {
    name: string;
    phone?: string | null | undefined;
    email?: string | null | undefined;
  };
};

export async function createCompanyAction(
  prevState: CompanyActionState,
  formData: FormData,
): Promise<CompanyActionState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const result = createCompanySchema.safeParse({
    name,
    phone: phone,
    email: email,
  });

  if (!result.success) {
    return {
      success: false,

      errors: result.error.flatten().fieldErrors,

      values: {
        name,
        phone,
        email,
      },
    };
  }

  await createCompany({
    name: result.data.name,
    email: result?.data?.email ?? null,
    phone: result?.data?.phone ?? null,
  });

  revalidatePath("/admin/companies");

  redirect("/admin/companies");
}
