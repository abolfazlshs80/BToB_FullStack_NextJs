import { getOrderReport } from "@/app/services/reports/report.order.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getOrderReport();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("ORDER REPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت گزارش سفارش‌ها",
      },
      {
        status: 500,
      },
    );
  }
}
