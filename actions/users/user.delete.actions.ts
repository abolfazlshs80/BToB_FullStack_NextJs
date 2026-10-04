"use server";

import { revalidatePath } from "next/cache";
import { deleteUser } from "@/app/services/user.service";

export async function deleteUserAction(id: number) {
  await deleteUser(id);

  revalidatePath("/admin/users");

  return {
    success: true,
  };
}
