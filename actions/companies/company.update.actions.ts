"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { updateCompanySchema } from "@/app/schemas/company.schema";
import { updateCompany } from "@/app/services/company.service";

export type UpdateCompanyActionState = {
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

export async function updateCompanyAction(
  prevState: UpdateCompanyActionState,
  formData: FormData,
): Promise<UpdateCompanyActionState> {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");

  const result = updateCompanySchema.safeParse({
    id,
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
        phone: phone,
        email: email,
      },
    };
  }

  await updateCompany({
    id: result.data.id,
    name: result.data.name,
    email: result?.data?.email ?? null,
    phone: result?.data?.phone ?? null,
  });

  revalidatePath("/admin/companies");

  redirect("/admin/companies");
}
