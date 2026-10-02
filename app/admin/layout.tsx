import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger />

          <div className="mr-4 font-semibold">پنل مدیریت</div>
        </header>

        <main className="flex-1 bg-muted/40 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
