"use server";

import { createCustomerSchema } from "./schema";

export type CreateCustomerState = {
  success: boolean;
  message: string;
  errors?: {
    companyName?: string[];
    contactName?: string[];
    email?: string[];
    phone?: string[];
  };
};

export async function createCustomer(
  prevState: CreateCustomerState,
  formData: FormData
): Promise<CreateCustomerState> {
  const result = createCustomerSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "لطفاً خطاهای فرم را برطرف کنید",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const customer = result.data;

  console.log("Customer:", customer);

  return {
    success: true,
    message: "مشتری با موفقیت ایجاد شد",
    errors: {},
  };
}