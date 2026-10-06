import { notFound } from "next/navigation";

import { getCompanyById } from "@/app/services/company.service";
import { CompanyInfo } from "@/components/admin/companies/company-info";
import { CompanyCustomers } from "@/components/admin/companies/customers/company-customers";
import { CompanyOrders } from "@/components/admin/companies/orders/order-company";
import { getProductsForOrder } from "@/app/services/product.service";

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
  const products = await getProductsForOrder();

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CompanyInfo company={company} />

      <CompanyCustomers customers={company.customers} companyId={company.id} />

      <CompanyOrders
        orders={company.orders}
        products={products}
        companyId={company.id}
        customers={company.customers}
      />
    </div>
  );
}
