import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}

export async function POST() {
  return NextResponse.json({
    message: "Users API",
  });
}

export async function PUT() {
  return NextResponse.json({
    message: "Users API",
  });
}

export async function PATCH() {
  return NextResponse.json({
    message: "Users API",
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: "Users API",
  });
}
