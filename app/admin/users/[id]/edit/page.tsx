import { notFound } from "next/navigation";

import { getUserById } from "@/app/services/user.service";
import { UserEditForm } from "@/components/admin/users/update-user-form";


type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({
  params,
}: EditUserPageProps) {
  const { id } = await params;

  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    notFound();
  }

  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          ویرایش کاربر
        </h1>

        <p className="text-sm text-muted-foreground">
          ویرایش اطلاعات و نقش کاربر
        </p>
      </div>

      <UserEditForm user={user} />
    </div>
  );
}