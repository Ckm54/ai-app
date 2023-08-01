import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log({ token });
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/synthai/:path*", "/dashboard"] };
