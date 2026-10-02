"use server";

import { createProductSchema } from "@/app/schemas/product.schema";
import { createProduct } from "@/app/services/product.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProductActionState = {
  success: boolean;
  errors?: {
    name?: string[];
    price?: string[];
  };
  values?: {
    name: string;
    price: string;
  };
};

export async function createProductAction(
  prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const name = String(formData.get("name") ?? "");
  const price = String(formData.get("price") ?? "");

  const result = createProductSchema.safeParse({
    name,
    price: Number(price),
  });

  if (!result.success) {
    return {
      success: false,

      errors: result.error.flatten().fieldErrors,

      values: {
        name,
        price,
      },
    };
  }

  await createProduct({
    name: result.data.name,
    price: result.data.price,
  });

  revalidatePath("/admin/products");

  redirect("/admin/products");

  return {
    success: true,
  };
}
