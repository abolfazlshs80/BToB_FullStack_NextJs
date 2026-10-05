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

import { getCompanys } from "@/app/services/company.service";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleCompanyStatusButton } from "@/components/admin/companies/toggle-company-status-button";
import { DeleteCompanyButton } from "@/components/admin/companies/delete-company-button";

export default async function CompanysPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params = await searchParams;

  const companies = await getCompanys({
    search: params.search,
    page: undefined,
    pageSize: undefined,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>لیست شرکت </CardTitle>

          <CardDescription>
            {companies.length} شرکت ثبت شده است.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <form method="GET" className="flex items-center gap-2">
            <Input
              name="search"
              placeholder="جستجوی شرکت..."
              defaultValue={params.search ?? ""}
            />

            <Button type="submit">جستجو</Button>
          </form>

          <Link href="/admin/companies/create">
            <Button>
              <Plus className="ml-2 size-4" />
              افزودن شرکت
            </Button>
          </Link>
        </div>
      </div>

      {/* Companys Card */}
      <Card>
        <CardHeader>
          <CardTitle>لیست شرکتات</CardTitle>

          <CardDescription>
            {companies.length} شرکت ثبت شده است.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>

                  <TableHead className="text-right">نام شرکت</TableHead>

                  <TableHead className="text-right">تلفن</TableHead>

                  <TableHead className="text-right">وضعیت</TableHead>

                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {companies.map((company, index) => (
                  <TableRow key={company.id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>

                    <TableCell>{company.phone} </TableCell>

                    <TableCell>
                      <Badge variant={company.status ? "default" : "secondary"}>
                        {company.status ? "فعال" : "غیرفعال"}
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
                              href={`/admin/companies/${company.id}/edit`}
                              className="flex w-full items-center"
                            >
                              <Pencil className="ml-2 size-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>

                          {/* Toggle Status */}
                          <DropdownMenuItem>
                            <ToggleCompanyStatusButton
                              companyId={company.id}
                              status={company.status}
                            />
                          </DropdownMenuItem>

                          {/* Delete */}
                          <DropdownMenuItem>
                            <DeleteCompanyButton companyId={company.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {companies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      شرکتی پیدا نشد.
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
