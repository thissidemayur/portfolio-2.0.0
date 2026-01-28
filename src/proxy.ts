import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose'; // lightweight JWT library for edge


// This function can be marked `async` if using `await` inside
// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define base routes that should be public
  const publicPrefixes = [
    "/", "/contact", "/projects", "/login", "/home", 
    "/about", "/certifications", "/blogs", "/resume", "/uses"
  ];

  // 2. Optimized check: Match prefixes and Next.js internal files
  const isPublicPath =
    publicPrefixes.some(path => pathname === path || pathname.startsWith(path + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public") ||
    pathname === "/favicon.ico";

  if (isPublicPath) {
    return NextResponse.next();
  }

  // 3. Protected admin routes
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
      console.error("JWT_VERIFY_ERROR:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 4. Fallback for anything else (should be public by default in most portfolios)
  return NextResponse.next(); 
}

