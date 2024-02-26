import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const education = await db.education.findMany()

        return NextResponse.json(education)
    } catch (error) {
        console.log('[GET EDUCATION]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}

export async function POST(req: Request) {
    try {
        const { title, description, image, startYear, endYear } =
            await req.json()

        const edu = await db.education.create({
            data: {
                title,
                description,
                image,
                startYear,
                endYear
            }
        })

        return NextResponse.json(edu)
    } catch (error) {
        console.log('[POST EDUCATION]', error)
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}
