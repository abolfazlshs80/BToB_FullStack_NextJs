import {
  getMonthlyOrderReport,
  getOrderReport,
} from "@/app/services/reports/report.order.service";
import { OrderReportCharts } from "@/components/admin/reports/orders/charts/order-report-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrdersReportPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    companyId?: string;
  }>;
};

export default async function OrdersReportPage({
  searchParams,
}: OrdersReportPageProps) {
  const params = await searchParams;

  const search = params.search || undefined;
  const status = params.status || undefined;

  const companyId = params.companyId ? Number(params.companyId) : undefined;

  const [orders, monthlyReport] = await Promise.all([
    getOrderReport({
      search,
      status,
      companyId,
    }),
    getMonthlyOrderReport(),
  ]);

  const totalOrders = orders.length;

  const totalSales = orders.reduce((sum, order) => sum + order.orderTotal, 0);

  const totalPaid = orders.reduce((sum, order) => sum + order.paidAmount, 0);

  const totalRemaining = orders.reduce(
    (sum, order) => sum + order.remainingAmount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">گزارش سفارش‌ها</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          گزارش سفارش‌ها، مبالغ پرداختی و مانده حساب
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلتر گزارش</CardTitle>
        </CardHeader>

        <CardContent>
          <form method="GET" className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                جستجو
              </label>

              <input
                id="search"
                name="search"
                defaultValue={search}
                placeholder="نام مشتری یا شرکت"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                وضعیت سفارش
              </label>

              <select
                id="status"
                name="status"
                defaultValue={status ?? ""}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="">همه</option>
                <option value="Pending">در انتظار</option>
                <option value="Completed">تکمیل شده</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="companyId" className="text-sm font-medium">
                شناسه شرکت
              </label>

              <input
                id="companyId"
                name="companyId"
                type="number"
                defaultValue={companyId ?? ""}
                placeholder="مثلاً 2"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                اعمال فیلتر
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">تعداد سفارش‌ها</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalOrders.toLocaleString("fa-IR")}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">مجموع فروش</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalSales.toLocaleString("fa-IR")} تومان
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">مجموع پرداخت</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalPaid.toLocaleString("fa-IR")} تومان
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">مجموع مانده</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {totalRemaining.toLocaleString("fa-IR")} تومان
            </div>
          </CardContent>
        </Card>
      </div>

      <OrderReportCharts monthlyReport={monthlyReport} />
      {/* Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست سفارش‌ها</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">#</TableHead>

                  <TableHead className="text-right">سفارش</TableHead>

                  <TableHead className="text-right">مشتری</TableHead>

                  <TableHead className="text-right">شرکت</TableHead>

                  <TableHead className="text-right">تعداد آیتم</TableHead>

                  <TableHead className="text-right">مبلغ سفارش</TableHead>

                  <TableHead className="text-right">پرداخت شده</TableHead>

                  <TableHead className="text-right">مانده</TableHead>

                  <TableHead className="text-right">وضعیت</TableHead>

                  <TableHead className="text-right">تاریخ</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell className="font-medium">
                      #{order.orderId}
                      {order.orderName && (
                        <div className="text-xs text-muted-foreground">
                          {order.orderName}
                        </div>
                      )}
                    </TableCell>

                    <TableCell>{order.customerName}</TableCell>

                    <TableCell>{order.companyName}</TableCell>

                    <TableCell>
                      {order.itemCount.toLocaleString("fa-IR")}
                    </TableCell>

                    <TableCell>
                      {order.orderTotal.toLocaleString("fa-IR")} تومان
                    </TableCell>

                    <TableCell>
                      {order.paidAmount.toLocaleString("fa-IR")} تومان
                    </TableCell>

                    <TableCell>
                      {order.remainingAmount.toLocaleString("fa-IR")} تومان
                    </TableCell>

                    <TableCell>
                      {order.orderStatus === "Completed"
                        ? "تکمیل شده"
                        : order.orderStatus === "Pending"
                          ? "در انتظار"
                          : order.orderStatus}
                    </TableCell>

                    <TableCell>
                      {new Intl.DateTimeFormat("fa-IR").format(
                        new Date(order.createdAt),
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center">
                      سفارشی با این فیلترها پیدا نشد.
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
