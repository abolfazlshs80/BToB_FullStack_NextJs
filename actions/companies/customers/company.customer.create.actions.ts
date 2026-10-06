"use server";

import { createCustomerSchema } from "@/app/schemas/customer.schema";
import { createCustomer } from "@/app/services/customer.service";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CustomerActionState = {
  success: boolean;

  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    companyId?: string[];
  };

  values?: {
    name: string;
    phone?: string | null;
    email?: string | null;
    companyId?: string | null;
  };
};

export async function createCustomerAction(
  prevState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const companyId = String(formData.get("companyId") ?? "");

  const result = createCustomerSchema.safeParse({
    name,
    phone,
    email,
    companyId: Number(companyId),
  });

  if (!result.success) {
    return {
      success: false,

      errors: result.error.flatten().fieldErrors,

      values: {
        name,
        phone,
        email,
        companyId,
      },
    };
  }

  await createCustomer({
    name: result.data.name,
    email: result.data.email || null,
    phone: result.data.phone || null,
    companyId: result.data.companyId,
  });

  revalidatePath(`/admin/companies/${result.data.companyId}`);

  redirect(`/admin/companies/${result.data.companyId}`);
}
