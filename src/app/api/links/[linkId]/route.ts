import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { linkId: string } }
) {
    try {
        const linkId = params.linkId
        if (!linkId) {
            return new NextResponse(
                'Missing linkId parameter in the request.',
                { status: 400 }
            )
        }

        const link = await db.links.findFirst({
            where: {
                id: linkId
            }
        })

        return NextResponse.json(link)
    } catch (error) {
        console.error('[GET LINK BY ID]', error)
        return new NextResponse(`GET LINK BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}

// Delete LINK
export async function DELETE(
    req: NextRequest,
    { params }: { params: { linkId: string } }
) {
    try {
        const linkId = params.linkId
        if (!linkId) {
            return new NextResponse(
                'Missing linkId parameter in the request.',
                { status: 400 }
            )
        }

        const link = await db.links.delete({
            where: {
                id: linkId
            }
        })

        return NextResponse.json(link)
    } catch (error) {
        console.error('[DELETE LINK]', error)
        return new NextResponse(`DELETE LINK ${error ? error : ''}`, {
            status: 500
        })
    }
}

// Update active LINK
export async function PUT(
    req: NextRequest,
    { params }: { params: { linkId: string } }
) {
    try {
        const linkId = params.linkId
        const values = await req.json()
        if (!linkId) {
            return new NextResponse(
                'Missing linkId parameter in the request.',
                { status: 400 }
            )
        }

        const link = await db.links.update({
            where: {
                id: linkId
            },
            data: {
                active: values.active
            }
        })

        return NextResponse.json(link)
    } catch (error) {
        console.error('[PATCH LINK]', error)
        return new NextResponse(`PATCH LINK ${error ? error : ''}`, {
            status: 500
        })
    }
}

// Update LINK
export async function PATCH(
    req: NextRequest,
    { params }: { params: { linkId: string } }
) {
    try {
        const linkId = params.linkId
        const values = await req.json()
        if (!linkId) {
            return new NextResponse(
                'Missing linkId parameter in the request.',
                { status: 400 }
            )
        }

        const link = await db.links.update({
            where: {
                id: linkId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(link)
    } catch (error) {
        console.error('[PATCH LINK]', error)
        return new NextResponse(`PATCH LINK ${error ? error : ''}`, {
            status: 500
        })
    }
}
