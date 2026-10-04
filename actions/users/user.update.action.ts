"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { updateUserSchema } from "@/app/schemas/user.schema";
import { updateUser } from "@/app/services/user.service";

export type UpdateUserActionState = {
  success: boolean;
  error?: string;
};

export async function updateUserAction(
  prevState: UpdateUserActionState,
  formData: FormData
): Promise<UpdateUserActionState> {
  const result = updateUserSchema.safeParse({
    id: formData.get("id"),
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "اطلاعات نامعتبر است",
    };
  }

  try {
    await updateUser(result.data);

    revalidatePath("/admin/users");
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "خطایی رخ داد",
    };
  }

  redirect("/admin/users");
}