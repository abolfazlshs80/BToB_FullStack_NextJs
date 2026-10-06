"use server";

import { revalidatePath } from "next/cache";

import { updateOrder } from "@/app/services/order.service";

export type OrderActionState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    status?: string[];
  };
  values: {
    name: string;
    status: string;
  };
};

export async function updateOrderAction(
  previousState: OrderActionState,
  formData: FormData,
): Promise<OrderActionState> {
  const orderId = Number(formData.get("orderId"));
  const companyId = Number(formData.get("companyId"));

  const name = String(formData.get("name") ?? "");
  const status = String(formData.get("status") ?? "");

  console.log("UPDATE ORDER DATA:", {
    orderId,
    companyId,
    name,
    status,
  });

  try {
    await updateOrder(orderId, {
      name,
      status,
    });

    revalidatePath(`/admin/companies/${companyId}`);

    return {
      success: true,
      values: {
        name,
        status,
      },
    };
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return {
      success: false,
      message: "خطا در بروزرسانی سفارش",
      values: {
        name,
        status,
      },
    };
  }
}
