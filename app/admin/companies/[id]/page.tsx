import { notFound } from "next/navigation";

import { getCompanyById } from "@/app/services/company.service";
import { CompanyInfo } from "@/components/admin/companies/company-info";
import { CompanyCustomers } from "@/components/admin/companies/customers/company-customers";



export default async function CompanyDetailsPage({
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
    <div className="space-y-6">
      <CompanyInfo company={company} />

      <CompanyCustomers
        customers={company.customers}
        companyId={company.id}
      />
    </div>
  );
}