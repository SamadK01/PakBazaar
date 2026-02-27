import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const configured = !!process.env.AUTH_SECRET;
  return NextResponse.json({ configured });
}

