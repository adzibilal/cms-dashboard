import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { eduId: string } }
) {
    try {
        const eduId = params.eduId
        if (!eduId) {
            return new NextResponse('Missing eduId parameter in the request.', {
                status: 400
            })
        }

        const education = await db.education.findFirst({
            where: {
                id: eduId
            }
        })

        return NextResponse.json(education)
    } catch (error) {
        console.error('[GET EDUCATION BY ID]', error)
        return new NextResponse(`GET EDUCATION BY ID ${error ? error : ''}`, {
            status: 500
        })
    }
}

// DELETE EDUCATION
export async function DELETE(
    req: NextRequest,
    { params }: { params: { eduId: string } }
) {
    try {
        const eduId = params.eduId
        if (!eduId) {
            return new NextResponse('Missing eduId parameter in the request.', {
                status: 400
            })
        }

        const education = await db.education.delete({
            where: {
                id: eduId
            }
        })

        return NextResponse.json(education)
    } catch (error) {
        console.error('[DELETE EDUCATION]', error)
        return new NextResponse(`DELETE EDUCATION ${error ? error : ''}`, {
            status: 500
        })
    }
}

// Update EDUCATION
export async function PATCH(
    req: NextRequest,
    { params }: { params: { eduId: string } }
) {
    try {
        const eduId = params.eduId
        const values = await req.json()
        if (!eduId) {
            return new NextResponse(
                'Missing eduId parameter in the request.',
                { status: 400 }
            )
        }

        const edu = await db.education.update({
            where: {
                id: eduId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(edu)
    } catch (error) {
        console.error('[PATCH LINK]', error)
        return new NextResponse(`PATCH LINK ${error ? error : ''}`, {
            status: 500
        })
    }
}