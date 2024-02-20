import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const links = await db.links.findMany()

        return NextResponse.json(links)
    } catch (error) {
        console.log('[GET LINKS]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}

export async function POST(req: Request) {
    try {
        const { title, link, active, important, image } = await req.json()
        
        const newLink = await db.links.create({
            data: {
                title,
                link,
                active,
                important,
                image
            }
        })

        return NextResponse.json(newLink)
    } catch (error) {
        console.log('[POST LINK]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
