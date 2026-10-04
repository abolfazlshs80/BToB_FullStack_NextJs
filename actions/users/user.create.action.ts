"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createUserSchema } from "@/app/schemas/user.schema";
import { createUser } from "@/app/services/user.service";

export type CreateUserActionState = {
  success: boolean;
  error?: string;
};

export async function createUserAction(
  prevState: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const result = createUserSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message,
    };
  }

  try {
    await createUser(result.data);

    revalidatePath("/admin/users");
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطایی رخ داد",
    };
  }

  redirect("/admin/users");
}
