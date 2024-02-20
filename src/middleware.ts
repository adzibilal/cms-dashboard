import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const protectedPath = ['/links', '/dashboard']

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') || // exclude Next.js internals
        pathname.startsWith('/api') || //  exclude all API routes
        pathname.startsWith('/static') || // exclude static files
        PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    )
        return NextResponse.next()

    // Memeriksa apakah kuki sesi ada
    const sessionCookie = request.cookies.get('session')

    if (pathname === '/login' && sessionCookie) {
        // Jika pengguna sudah memiliki sesi dan mencoba mengakses halaman login, redirect ke dashboard
        return NextResponse.rewrite(new URL('/dashboard', request.url))
    }

    if (protectedPath.includes(pathname) && !sessionCookie) {
        // Jika pengguna mencoba mengakses halaman dashboard tanpa sesi, redirect ke login
        return NextResponse.rewrite(new URL('/login', request.url))
    }

    // Lanjutkan ke pengolahan permintaan jika tidak ada kondisi khusus yang terpenuhi
    return NextResponse.next()
}

export default middleware
