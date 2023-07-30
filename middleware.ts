import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  // return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = { matcher: ["/:path*", "/dashboard"] };
