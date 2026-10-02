import {
  CreateProductDto,
  PatchProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from "@/app/DTOs/Products/product.dto";
import {
  createProduct,
  deleteProduct,
  getProducts,
  patchProduct,
  updateProduct,
} from "@/app/services/product.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query: ProductQueryDto = {
    search: searchParams.get("search") ?? undefined,
    price: searchParams.get("price")
      ? Number(searchParams.get("price"))
      : undefined,
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : undefined,
  };

  const products = await getProducts(query);

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body: CreateProductDto = await request.json();

  const product = await createProduct(body);

  return NextResponse.json(product, {
    status: 201,
  });
}

export async function PUT(request: Request) {
  const body: UpdateProductDto = await request.json();

  const product = await updateProduct(body);

  return NextResponse.json(product);
}

export async function PATCH(request: Request) {
  const body: PatchProductDto = await request.json();

  const product = await patchProduct(body);

  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const body: { id: number } = await request.json();

  await deleteProduct(body.id);

  return NextResponse.json({
    message: "محصول با موفقیت حذف شد",
  });
}
