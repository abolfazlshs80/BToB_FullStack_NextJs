import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/auth/logout-button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/authorization";
import { ROLES } from "@/lib/roles";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(ROLES.ADMIN);

  return (
    <SidebarProvider>
      <AdminSidebar />

      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />

          <div className="mr-4 font-semibold">پنل مدیریت</div>

          <div className="mr-auto flex items-center gap-4">
            <div className="text-sm">
              <span className="font-medium">{user.username}</span>

              <span className="mr-2 text-muted-foreground">
                {user.roles.join("، ")}
              </span>
            </div>

            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
