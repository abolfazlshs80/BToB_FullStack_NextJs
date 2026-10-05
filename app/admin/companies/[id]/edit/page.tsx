import { getCompanyById } from "@/app/services/company.service";
import { CompanyEditForm } from "@/components/admin/companies/edit-company-form";
import { notFound } from "next/navigation";


export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const companyId = Number(id);

  if (Number.isNaN(companyId)) {
    notFound();
  }

  const company = await getCompanyById(companyId);

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ویرایش شرکت</h1>

        <p className="text-muted-foreground">اطلاعات شرکت را ویرایش کنید.</p>
      </div>

      <CompanyEditForm company={company} />
    </div>
  );
}
