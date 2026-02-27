import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/lib/data";
import { getProductBySlug } from "@/lib/store";

export const runtime = "nodejs";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
