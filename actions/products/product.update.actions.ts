"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { updateProductSchema } from "@/app/schemas/product.schema";
import { updateProduct } from "@/app/services/product.service";

export type UpdateProductActionState = {
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

export async function updateProductAction(
  prevState: UpdateProductActionState,
  formData: FormData,
): Promise<UpdateProductActionState> {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "");
  const price = String(formData.get("price") ?? "");

  const result = updateProductSchema.safeParse({
    id,
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

  await updateProduct({
    id: result.data.id,
    name: result.data.name,
    price: result.data.price,
  });

  revalidatePath("/admin/products");

  redirect("/admin/products");
}