"use server";

import { revalidatePath } from "next/cache";
import { deleteProduct } from "@/app/services/product.service";

export async function deleteProductAction(id: number) {
  await deleteProduct(id);

  revalidatePath("/admin/products");

  return {
    success: true,
  };
}
