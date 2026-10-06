"use server";

import { createOrder } from "@/app/services/order.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateOrderActionState = {
  success: boolean;
  error?: string;
};

export async function createOrderAction(data: {
  customerId: number;
  companyId: number;

  status: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}): Promise<CreateOrderActionState> {
  console.log(data);
  try {
    if (!data.customerId) {
      return {
        success: false,
        error: "لطفاً مشتری را انتخاب کنید.",
      };
    }

    if (data.items.length === 0) {
      return {
        success: false,
        error: "حداقل یک محصول باید انتخاب شود.",
      };
    }

    console.log(data);
    await createOrder(data);
    // revalidatePath(`/admin/companies/${data.companyId}`);

    // redirect(`/admin/companies/${data.companyId}`);
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "خطا در ثبت سفارش.",
    };
  }
}
