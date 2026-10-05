import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, Pencil, Plus } from "lucide-react";

import Link from "next/link";

import { getUsers } from "@/app/services/user.service";
import { DeleteUserButton } from "@/components/admin/users/delete-user-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@base-ui/react";
import { createPageUrl } from "@/lib/utils/createPageUrl";
import { DataPagination } from "@/components/common/data-pagination";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    pageSize?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Math.max(Number(params.page ?? "1") || 1, 1);
  const pageSize = Math.max(Number(params.pageSize ?? "2") || 2, 1);

  const result = await getUsers({
    search: params.search,
    page,
    pageSize: pageSize,
  });

  const { users, totalCount, totalPages } = result;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>لیست کاربران</CardTitle>

          <CardDescription>{totalCount} کاربر ثبت شده است.</CardDescription>
        </div>

        <Link href="/admin/users/create">
          <Button>
            <Plus className="ml-2 size-4" />
            افزودن کاربر
          </Button>
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Input
          name="search"
          placeholder="جستجوی محصول..."
          defaultValue={params.search ?? ""}
        />

        <Button type="submit">جستجو</Button>
      </form>
      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>کاربران</CardTitle>

          <CardDescription>مدیریت کاربران و نقش‌های سیستم</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>

                  <TableHead className="text-right">نام کاربری</TableHead>

                  <TableHead className="text-right">نقش</TableHead>

                  <TableHead className="text-right">تاریخ ایجاد</TableHead>

                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    {/* ID */}
                    <TableCell>{index + 1}</TableCell>

                    {/* Username */}
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>

                    {/* Roles */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge
                            key={role}
                            variant={role === "Admin" ? "default" : "secondary"}
                          >
                            {role === "Admin"
                              ? "مدیر"
                              : role === "Employer"
                                ? "کارفرما"
                                : "کارجو"}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    {/* Created At */}
                    <TableCell>
                      {user.createdAt.toLocaleDateString("fa-IR")}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="flex w-full items-center"
                            >
                              <Pencil className="ml-2 size-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <DeleteUserButton userId={user.id} />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      کاربری پیدا نشد.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataPagination
            pathname="/admin/users"
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            search={params.search}
          />
        </CardContent>
      </Card>
    </div>
  );
}
