// import { authMiddleware } from "@clerk/nextjs";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
// export default authMiddleware({
//   // Landing page is unprotected
//   publicRoutes: ["/", "/api/webhook"],
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;
    const protectedPaths = ["/", "/dashboard"];
    const isPathProtected = protectedPaths.some((path) => pathName === path);

    const res = NextResponse.next();

    if (isPathProtected) {
      const token = await getToken({ req });

      console.log({ token });

      // if (!token) {
      //   const url = new URL("auth/signin", req.url);
      //   url.searchParams.set("callbackUrl", pathName);
      //   return NextResponse.redirect(url);
      // }
    }
    return res;
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = { matcher: ["/dashboard"] };
