import type { NextRequest } from 'next/server'
import { getSession } from './auth'
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith('/empresa')) {
    if (!session || session.user.role !== "COMPANY" || session.user.system !== "Simplesis") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.role !== "ADMIN" || session.user.system !== "Simplesis") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}