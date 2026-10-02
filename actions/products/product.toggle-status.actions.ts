"use server";

import { revalidatePath } from "next/cache";

import { toggleProductStatus } from "@/app/services/product.service";

export async function toggleProductStatusAction(id: number) {
  await toggleProductStatus(id);

  revalidatePath("/admin/products");

  return {
    success: true,
  };
}