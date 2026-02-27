import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }
  const { auth } = await import("@/auth");
  // @ts-expect-error calling NextAuth proxy handler
  return auth(req);
}

export const config = {
  matcher: ["/admin/:path*"],
};
