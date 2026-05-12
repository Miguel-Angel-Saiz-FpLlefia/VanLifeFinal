import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET || "default_super_secret_key_change_me_in_prod";
const encodedKey = new TextEncoder().encode(secretKey);

export default async function middleware(request: NextRequest) {
  // Solo interceptar rutas que empiezan por /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, encodedKey, {
        algorithms: ["HS256"],
      });

      // Verificar si tiene rol ADMIN
      console.log('Middleware - Role:', payload.role);
      if (payload.role !== 'ADMIN') {
        console.log('Middleware - Access denied, redirecting to /');
        return NextResponse.redirect(new URL('/', request.url));
      }
      console.log('Middleware - Access granted');

    } catch (error) {
      // Token inválido o expirado
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
