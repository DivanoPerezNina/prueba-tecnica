// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto las que empiezan por:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes de optimización)
     * - favicon.ico (archivo de ícono)
     * - login (la página de login)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
};

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('jwt-token');

  const { pathname } = request.nextUrl;

  if (!tokenCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname); 

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}