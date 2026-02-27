import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { auth } from "@/auth";
import type { Product } from "@/lib/data";

const filePath = path.join(process.cwd(), "data", "products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProducts(products: Product[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const body = await req.json();
  const products = await readProducts();
  products.push(body as Product);
  await writeProducts(products);
  return NextResponse.json(body, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const updated = (await req.json()) as Product;
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === updated.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  products[idx] = updated;
  await writeProducts(products);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== id);
  await writeProducts(filtered);
  return NextResponse.json({ ok: true });
}

