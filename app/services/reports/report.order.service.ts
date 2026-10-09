import {
  MonthlyOrderReportDto,
  OrderReportDto,
  OrderReportFilterDto,
} from "@/app/DTOs/reports/orders/order-report.dto";
import prisma from "@/lib/prisma";

export async function getOrderReport(
  filters?: OrderReportFilterDto,
): Promise<OrderReportDto[]> {
  const search = filters?.search ? `%${filters.search}%` : null;

  const status = filters?.status || null;

  const companyId = filters?.companyId ?? null;

  const fromDate = filters?.fromDate ?? null;

  const toDate = filters?.toDate ?? null;
  console.log(toDate);
  const result = await prisma.$queryRaw<OrderReportDto[]>`
    SELECT
        o.id AS orderId,
        o.name AS orderName,

        c.name AS customerName,
        co.name AS companyName,

        o.totalPrice AS orderTotal,
        o.status AS orderStatus,

        ISNULL(oi.ItemCount, 0) AS itemCount,

        ISNULL(p.PaidAmount, 0) AS paidAmount,

        o.totalPrice - ISNULL(p.PaidAmount, 0) AS remainingAmount,

        o.createdAt AS createdAt

    FROM [Order] o

    INNER JOIN Customer c
        ON c.id = o.customerId

    INNER JOIN Company co
        ON co.id = c.companyId

    LEFT JOIN (
        SELECT
            orderId,
            COUNT(*) AS ItemCount
        FROM OrderItem
        GROUP BY orderId
    ) oi
        ON oi.orderId = o.id

    LEFT JOIN (
        SELECT
            orderId,
            SUM(amount) AS PaidAmount
        FROM Payment
        WHERE status = 'Completed'
        GROUP BY orderId
    ) p
        ON p.orderId = o.id

    WHERE
        (
            ${search} IS NULL
            OR c.name LIKE ${search}
            OR co.name LIKE ${search}
        )

        AND (
            ${status} IS NULL
            OR o.status = ${status}
        )

        AND (
            ${companyId} IS NULL
            OR co.id = ${companyId}
        )

        AND (
            ${fromDate} IS NULL
            OR o.createdAt >= ${fromDate}
        )

        AND (
            ${toDate} IS NULL
            OR o.createdAt < ${toDate}
        )

    ORDER BY o.createdAt DESC
  `;

  return result.map((order) => ({
    orderId: order.orderId,
    orderName: order.orderName,
    customerName: order.customerName,
    companyName: order.companyName,
    orderTotal: Number(order.orderTotal),
    orderStatus: order.orderStatus,
    itemCount: Number(order.itemCount),
    paidAmount: Number(order.paidAmount),
    remainingAmount: Number(order.remainingAmount),
    createdAt: order.createdAt,
  }));
}

export async function getMonthlyOrderReport(): Promise<
  MonthlyOrderReportDto[]
> {
  const result = await prisma.$queryRaw<MonthlyOrderReportDto[]>`
    SELECT
        FORMAT(o.createdAt, 'yyyy-MM') AS month,
        COUNT(*) AS orderCount,
        SUM(o.totalPrice) AS totalSales
    FROM [Order] o
    GROUP BY FORMAT(o.createdAt, 'yyyy-MM')
    ORDER BY month;
  `;

  return result.map((item) => ({
    month: item.month,
    orderCount: Number(item.orderCount),
    totalSales: Number(item.totalSales),
  }));
}
