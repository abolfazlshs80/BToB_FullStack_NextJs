import { CreateProductForm } from "@/components/admin/products/create-product-form";

export default function CreateProductPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">افزودن محصول</h1>

        <p className="text-muted-foreground">
          محصول جدیدی به فروشگاه اضافه کنید.
        </p>
      </div>

      <CreateProductForm />
    </div>
  );
}
