import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.redirect(new URL('/api/public/authorize','http://localhost:3000/'))
}

export const config = {
  matcher: ['/u/:path*', '/api/private/:path*'],
}
