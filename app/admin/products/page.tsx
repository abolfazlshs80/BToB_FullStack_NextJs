import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil } from "lucide-react";

import Link from "next/link";

import { getProducts } from "@/app/services/product.service";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DeleteProductButton } from "@/components/admin/products/delete-product-button";
import { ToggleProductStatusButton } from "@/components/admin/products/toggle-product-status-button";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params = await searchParams;

  const products = await getProducts({
    search: params.search,
    price: undefined,
    page: undefined,
    pageSize: undefined,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>لیست محصولات</CardTitle>

          <CardDescription>
            {products.length} محصول ثبت شده است.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <form method="GET" className="flex items-center gap-2">
            <Input
              name="search"
              placeholder="جستجوی محصول..."
              defaultValue={params.search ?? ""}
            />

            <Button type="submit">جستجو</Button>
          </form>

          <Link href="/admin/products/create">
            <Button>
              <Plus className="ml-2 size-4" />
              افزودن محصول
            </Button>
          </Link>
        </div>
      </div>

      {/* Products Card */}
      <Card>
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>

          <CardDescription>
            {products.length} محصول ثبت شده است.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>

                  <TableHead className="text-right">نام محصول</TableHead>

                  <TableHead className="text-right">قیمت</TableHead>

                  <TableHead className="text-right">وضعیت</TableHead>

                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>

                    <TableCell>
                      {product.price.toLocaleString("fa-IR")} تومان
                    </TableCell>

                    <TableCell>
                      <Badge variant={product.status ? "default" : "secondary"}>
                        {product.status ? "فعال" : "غیرفعال"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {/* Edit */}
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="flex w-full items-center"
                            >
                              <Pencil className="ml-2 size-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>

                          {/* Toggle Status */}
                          <DropdownMenuItem>
                            <ToggleProductStatusButton
                              productId={product.id}
                              status={product.status}
                            />
                          </DropdownMenuItem>

                          {/* Delete */}
                          <DropdownMenuItem>
                            <DeleteProductButton productId={product.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      محصولی پیدا نشد.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
