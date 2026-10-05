import { CreateCompanyForm } from "@/components/admin/companies/create-company-form";


export default function CreateCompanyPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">افزودن شرکت</h1>

        <p className="text-muted-foreground">شرکت جدیدی اضافه کنید.</p>
      </div>

      <CreateCompanyForm />
    </div>
  );
}
