import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = new URL(req.url);
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/signin" ||
          pathname === "/register" ||
          pathname === "/" ||
          pathname.startsWith("/api/video")
        ) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: "/signin",
      error: "/signin",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|signin|register).*)",
  ],
};
