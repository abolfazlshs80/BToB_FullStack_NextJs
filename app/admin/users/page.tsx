import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>لیست کاربران</CardTitle>

          <CardDescription>{users.length} کاربر ثبت شده است.</CardDescription>
        </div>

        <Link href="/admin/users/create">
          <Button>
            <Plus className="ml-2 size-4" />
            افزودن کاربر
          </Button>
        </Link>
      </div>

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
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/admin/users/${user.id}/edit`}>
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
        </CardContent>
      </Card>
    </div>
  );
}
