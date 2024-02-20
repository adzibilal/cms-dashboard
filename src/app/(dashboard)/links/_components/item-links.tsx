import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { BsEye, BsEyeSlash, BsTrash, BsPencil } from 'react-icons/bs'
import { Links } from '@prisma/client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

const ItemLinks = ({
    links,
    onSuccess
}: {
    links: (Links & { image: string | null }) | any
    onSuccess: () => void
}) => {
    const { id, title, link, active, important, image } = links

    const toggleActiveLink = async () => {
        try {
            const response = await fetch(`/api/links/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ active: !active })
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Link updated successfully', {
                    icon: '✅',
                    position: 'bottom-right'
                })
                onSuccess()
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to update link')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to update link', {
                icon: '❌',
                position: 'bottom-right'
            })
        }
    }

    const deleteLink = async () => {
        const confirm = window.confirm('Are you sure you want to delete this link?')
        if (!confirm) return
        try {
            const response = await fetch(`/api/links/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Link deleted successfully', {
                    icon: '✅',
                    position: 'bottom-right'
                })
                onSuccess()
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
        <Card className={`mb-3 ${!active ? 'opacity-50' : ''}`}>
            <div className='flex p-3 items-center gap-3 relative'>
                {image && (
                    <Image
                        className='bg-muted rounded-md w-16 h-16'
                        src={image}
                        width={100}
                        height={100}
                        alt=''
                    />
                )}
                <div className=''>
                    <div className=''>{title}</div>
                    <div className=''>{link}</div>
                </div>
                <div className='absolute right-5 flex gap-3 items-center'>
                    <div
                        onClick={toggleActiveLink}
                        className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {!active ? <BsEye /> : <BsEyeSlash />}
                                </TooltipTrigger>
                                <TooltipContent>
                                    {!active ? 'Activate Link' : 'Disable Link'}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div
                        onClick={deleteLink}
                        className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                        <BsPencil />
                    </div>
                    <div
                        onClick={deleteLink}
                        className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                        <BsTrash />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ItemLinks
