import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userJson = request.cookies.get("user")?.value;
  
  // Check if user is trying to access protected routes
  if (pathname.startsWith("/protected")) {
    // If no user cookie exists, redirect to login
    if (!userJson) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    
    try {
      const user = JSON.parse(userJson);
      
      // Check if user is trying to access admin routes but is not an admin
      if (pathname.startsWith("/protected/admin") && user.role !== "admin") {
        return NextResponse.redirect(
          new URL("/protected/client/dashboard", request.url)
        );
      }
      
      // Check if user is trying to access client routes but is not a client
      if (pathname.startsWith("/protected/client") && user.role !== "client") {
        return NextResponse.redirect(
          new URL("/protected/admin/dashboard", request.url)
        );
      }
    } catch (error) {
      // If there's an error parsing the user cookie, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  
  // Check if user is trying to access auth routes but is already logged in
  if (pathname.startsWith("/auth")) {
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        
        // Redirect to appropriate dashboard based on role
        if (user.role === "admin") {
          return NextResponse.redirect(
            new URL("/protected/admin/dashboard", request.url)
          );
        } else {
          return NextResponse.redirect(
            new URL("/protected/client/dashboard", request.url)
          );
        }
      } catch (error) {
        // If there's an error parsing the user cookie, continue to auth pages
      }
    }
  }
  
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Match all protected routes
    "/protected/:path*",
    // Match all auth routes
    "/auth/:path*",
  ],
};
