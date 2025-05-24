import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth"

export default async function middleware(request: NextRequest) {
  const session = await auth()

  // If the user is not signed in and the current path is not /auth/signin,
  // redirect the user to /auth/signin
  if (!session && !request.nextUrl.pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If the user is signed in and the current path is /auth/signin,
  // redirect the user to /
  if (session && request.nextUrl.pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 