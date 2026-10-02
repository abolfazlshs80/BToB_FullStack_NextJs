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

import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/app/services/product.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteProductButton } from "@/components/admin/products/delete-product-button";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">محصولات</h1>

          <p className="text-muted-foreground">مدیریت محصولات فروشگاه</p>
        </div>

        <Link href="/admin/products/create">
          <Button>
            <Plus className="ml-2 size-4" />
            افزودن محصول
          </Button>
        </Link>
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
                      <Badge variant="secondary">فعال</Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Pencil className="ml-2 size-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>

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
