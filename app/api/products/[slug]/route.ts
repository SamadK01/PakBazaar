import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
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

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const products = await readProducts();
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

