import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const hasUrl = !!process.env.SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const sb = getSupabaseServerClient();
  if (!sb) {
    return NextResponse.json({
      configured: false,
      hasUrl,
      hasKey,
      canConnect: false,
      error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    });
  }
  try {
    const { error } = await sb.from("products").select("id").limit(1);
    if (error) {
      return NextResponse.json({
        configured: true,
        hasUrl,
        hasKey,
        canConnect: false,
        error: error.message,
      });
    }
    return NextResponse.json({
      configured: true,
      hasUrl,
      hasKey,
      canConnect: true,
      error: null,
    });
  } catch (e: any) {
    return NextResponse.json({
      configured: true,
      hasUrl,
      hasKey,
      canConnect: false,
      error: e?.message || "Unknown error",
    });
  }
}

