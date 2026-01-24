import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose'; // lightweight JWT library for edge


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allowest route
  const publicPaths = ["/", "/contact", "/projects", "/login", "/home","/about","/certifications","/blogs","/resume","/uses"
  ];

  const isPublicPath =
    publicPaths.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public");

  if (isPublicPath) {
    return NextResponse.next(); // Let these pass through!
  }
  // protected route
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("login", request.url));
    }
  }
  return NextResponse.redirect(new URL("/home", request.url));
}


