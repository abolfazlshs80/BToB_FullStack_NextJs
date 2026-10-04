import { CreateUserForm } from "@/components/admin/users/create-user-form";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ایجاد کاربر</h1>

        <p className="text-sm text-muted-foreground">
          ایجاد کاربر جدید و تعیین نقش
        </p>
      </div>

      <CreateUserForm />
    </div>
  );
}
