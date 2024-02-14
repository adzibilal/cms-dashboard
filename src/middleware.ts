import { NextRequest, NextResponse } from 'next/server'

export const config = {
    matcher: ['/dashboard', '/login']
}

const middleware = async (request: NextRequest) => {
    // Memeriksa apakah kuki sesi ada
    const sessionCookie = request.cookies.get('session')
    const { pathname } = request.nextUrl

    if (pathname === '/login' && sessionCookie) {
        // Jika pengguna sudah memiliki sesi dan mencoba mengakses halaman login, redirect ke dashboard
        return NextResponse.rewrite(new URL('/dashboard', request.url))
    }

    if (pathname === '/dashboard' && !sessionCookie) {
        // Jika pengguna mencoba mengakses halaman dashboard tanpa sesi, redirect ke login
        return NextResponse.rewrite(new URL('/login', request.url))
    }

    // Lanjutkan ke pengolahan permintaan jika tidak ada kondisi khusus yang terpenuhi
    return NextResponse.next()
}

export default middleware
