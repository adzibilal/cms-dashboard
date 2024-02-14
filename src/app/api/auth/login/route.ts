import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(
    req: NextRequest,
) {
    try {
        // Mengambil data JSON dari badan permintaan
        const values = await req.json()
        // Mendapatkan username dan password dari data JSON
        const { username, password } = values
        
        // Cari pengguna berdasarkan username
        const user = await db.user.findUnique({
            where: {
                username: username
            }
        })

        // Jika pengguna tidak ditemukan, kembalikan respons dengan status 404
        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }

        // Membandingkan password yang dikirim dengan password di database
        const passwordMatch = await bcrypt.compare(password, user.password)

        // Jika password tidak cocok, kembalikan respons dengan status 401 (Unauthorized)
        if (!passwordMatch) {
            return new NextResponse('Username or Password is Wrong', { status: 401 })
        }

        // Membuat objek baru tanpa properti password
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            avatar: user.avatar,
            role: user.role
        };

        // Jika username dan password cocok, kembalikan data pengguna tanpa password sebagai respons
        return NextResponse.json(userWithoutPassword)
    } catch (error) {
        console.error('[LOGIN]', error)
        // Jika terjadi kesalahan, kembalikan respons dengan status 500 (Internal Server Error)
        return new NextResponse(`LOGIN ${error ? error : ''}`, {
            status: 500
        })
    }
}