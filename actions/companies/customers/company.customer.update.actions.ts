"use server";

import {
  createCustomerSchema,
  updateCustomerSchema,
} from "@/app/schemas/customer.schema";
import {
  createCustomer,
  updateCustomer,
} from "@/app/services/customer.service";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CustomerActionState = {
  success: boolean;

  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    companyId?: string[];
    customerId?: string[];
  };

  values?: {
    name: string;
    phone?: string | null;
    email?: string | null;
    companyId?: string | null;
    customerId?: string | null;
  };
};

export async function updateCustomerAction(
  prevState: CustomerActionState,
  formData: FormData,
): Promise<CustomerActionState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const companyId = String(formData.get("companyId") ?? "");
  const customerId = String(formData.get("customerId") ?? "");

  const result = updateCustomerSchema.safeParse({
    name,
    phone,
    email,
    companyId: Number(companyId),
    customerId: Number(customerId),
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
        customerId,
      },
    };
  }

  await updateCustomer({
    name: result.data.name,
    email: result.data.email || null,
    phone: result.data.phone || null,
    id: Number(result.data.customerId),
  });

  revalidatePath(`/admin/companies/${result.data.companyId}`);

  redirect(`/admin/companies/${result.data.companyId}`);
}
