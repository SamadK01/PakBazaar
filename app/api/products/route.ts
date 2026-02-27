import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/lib/data";
import { listProducts, createProduct, updateProduct, deleteProduct } from "@/lib/store";

export const runtime = "nodejs";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function GET() {
  const products = await listProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = (await req.json()) as Product;
    const created = await createProduct(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Read-only in production" }, { status: 501 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const updated = (await req.json()) as Product;
    const saved = await updateProduct(updated);
    return NextResponse.json(saved);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Read-only in production" }, { status: 501 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    await deleteProduct(String(id));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Read-only in production" }, { status: 501 });
  }
}
