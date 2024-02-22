'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
//@ts-ignore
import { CloudinaryContext, Image } from 'cloudinary-react'
import { BsPencil } from 'react-icons/bs'
import { Links } from '@prisma/client'

const EditLinks = ({ onSuccess, links }: { onSuccess: () => void, links: Links })   => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        link: '',
        important: false,
        active: true
    })
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            title: links.title ?? '',
            link: links.link ?? '',
            important: links.important,
            active: links.active
        }))
        setImageUrl(links.image ?? '')
    }, [links])
    

    const clearForm = () => {
        setData({
            title: '',
            link: '',
            important: false,
            active: true
        })
        setImageUrl('')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSwitchChange = (name: keyof typeof data) => {
        setData(prevData => ({ ...prevData, [name]: !prevData[name] }))
    }

    const submitLink = async () => {
        setIsLoading(true)

        const payload = {
            ...data,
            image: imageUrl
        }

        try {
            const response = await fetch(`/api/links/${links.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Link updated successfully', {
                    icon: '✅',
                    position: 'top-center'
                })
                setOpen(false)
                clearForm()
                onSuccess()
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to edit link')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to edit link', {
                icon: '❌',
                position: 'top-center'
            })
        }

        setIsLoading(false)
    }

    const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'ml_default')

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dfzjkdczw/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            )

            if (response.ok) {
                const data = await response.json()
                setImageUrl(data.secure_url)
            } else {
                throw new Error('Failed to upload image')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to upload image', {
                icon: '❌',
                position: 'top-center'
            })
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <div
                    className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                    <BsPencil />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Link</AlertDialogTitle>
                    <AlertDialogDescription>
                        {imageUrl && (
                            <Image
                                width={150}
                                height={150}
                                alt=''
                                src={imageUrl}
                                className='aspect-square rounded-md object-cover'
                            />
                        )}
                        <div className='grid w-full max-w-sm items-center gap-1.5 mb-2 mt-2'>
                            <Label htmlFor='picture'>Picture</Label>
                            <Input
                                onChange={handleImgChange}
                                id='picture'
                                type='file'
                            />
                        </div>
                        <div className='grid w-full items-center gap-2 mb-2'>
                            <Label className='!text-left' htmlFor='title'>
                                Title
                            </Label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                value={data.title}
                                placeholder='Link title'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid w-full items-center gap-2 mb-2'>
                            <Label className='!text-left' htmlFor='link'>
                                Link
                            </Label>
                            <Input
                                type='text'
                                id='link'
                                name='link'
                                value={data.link}
                                placeholder='Insert your link ...'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-start gap-5 mt-5'>
                            <div className='flex items-center space-x-2'>
                                <Switch
                                    id='important'
                                    name='important'
                                    checked={data.important}
                                    onCheckedChange={() =>
                                        handleSwitchChange('important')
                                    }
                                />
                                <Label htmlFor='important'>Important</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Switch
                                    id='active'
                                    name='active'
                                    checked={data.active}
                                    onCheckedChange={() =>
                                        handleSwitchChange('active')
                                    }
                                />
                                <Label htmlFor='active'>Active</Label>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={submitLink} disabled={isLoading}>
                        Save Link
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditLinks
