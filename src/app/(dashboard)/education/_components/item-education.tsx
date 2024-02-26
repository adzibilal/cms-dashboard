import { Education } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { toast } from 'sonner'
import EditEdu from './edit-edu'

const ItemEducation = ({
    edu,
    refresh
}: {
    edu: Education
    refresh: () => void
}) => {
    const deleteEdu = async (id: string) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this link?'
        )
        if (!confirm) return
        try {
            const response = await fetch(`/api/education/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Link deleted successfully', {
                    icon: '✅',
                    position: 'bottom-right'
                })
                refresh()
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to delete link')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to delete link', {
                icon: '❌',
                position: 'bottom-right'
            })
        }
    }

    return (
        <div className='border border-muted p-3 rounded-md relative'>
            <div className='p-2 bg-muted rounded-xl w-max mb-3'>
                <Image width={100} height={100} alt='' src={edu.image ?? '-'} />
            </div>
            <div className='font-semibold'>{edu.title}</div>
            <div className='text-muted-foreground'>
                {edu.description ?? '-'}
            </div>
            <div className='text-muted-foreground text-sm'>
                {edu.startYear ?? '-'} - {edu.endYear ?? '-'}
            </div>
            <div className='absolute right-3 top-3 flex gap-2 flex-col'>
                <div
                    onClick={() => deleteEdu(edu.id)}
                    className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                    <BsTrash />
                </div>
                <EditEdu edu={edu} onSuccess={refresh}/>
            </div>
        </div>
    )
}

export default ItemEducation
