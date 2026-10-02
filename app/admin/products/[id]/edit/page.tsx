import { notFound } from "next/navigation";

import { getProductById } from "@/app/services/product.service";
import { ProductEditForm } from "@/components/admin/products/edit-product-form";


export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ویرایش محصول</h1>

        <p className="text-muted-foreground">
          اطلاعات محصول را ویرایش کنید.
        </p>
      </div>

      <ProductEditForm product={product} />
    </div>
  );
}