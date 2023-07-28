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
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = { matcher: ["/admin"] };
