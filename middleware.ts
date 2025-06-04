import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Get the session using NextAuth v5 auth function
  const session = await auth()

  // Define protected routes (now without role-based access)
  const protectedRoutes = [
    "/dashboard",
    "/profile", 
    "/courses",
  ]
  // Define public routes that don't need authentication
  const publicRoutes = [
    "/",
    "/auth/signin",
    "/auth/register",
    "/auth/error",
    "/auth/verify-request",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/statistics", // Public statistics page
  ]

  // Allow access to API routes (they handle their own auth)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Allow access to public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next()
  }
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/auth/signin", req.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)  }

  // Check if user is verified for sensitive operations
  if (session && !session.user.isVerified) {
    const sensitiveRoutes = [
      "/courses/create",
      "/profile/edit",
    ]
    
    const isSensitiveRoute = sensitiveRoutes.some(route => 
      pathname.startsWith(route)
    )
    
    if (isSensitiveRoute) {
      return NextResponse.redirect(new URL("/auth/verify-email", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - they handle their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
