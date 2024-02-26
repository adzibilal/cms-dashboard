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
import { toast } from 'sonner'
import Image from 'next/image'
import { BsPencil } from 'react-icons/bs'
import { Education } from '@prisma/client'

const EditEdu = ({ edu, onSuccess }: { edu: Education, onSuccess: () => void }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        image: '',
        description: '',
        startYear: '',
        endYear: ''
    })

    const clearForm = () => {
        setData({
            title: '',
            image: '',
            description: '',
            startYear: '',
            endYear: ''
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prevData => ({ ...prevData, [name]: value }))
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
                setData(prevData => ({ ...prevData, image: data.secure_url }))
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

    const submitLink = async () => {
        setIsLoading(true)
        const startYear = data.startYear.split('-')[0]
        const endYear = data.endYear.split('-')[0]

        const payload = {
            ...data,
            startYear,
            endYear
        }

        try {
            const response = await fetch(`/api/education/${edu.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Education edited successfully', {
                    icon: '✅',
                    position: 'top-center'
                })
                setOpen(false)
                clearForm()
                onSuccess()
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to edit education')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to edit education', {
                icon: '❌',
                position: 'top-center'
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        setData({
            title: edu.title,
            image: edu.image || '',
            description: edu.description || '',
            startYear: stringYearToDate(edu.startYear ?? '') || '',
            endYear: stringYearToDate(edu.endYear ?? '') || ''
        })
    }, [edu])
    
    const stringYearToDate = (year: string) => {
        const date = new Date()
        date.setFullYear(parseInt(year))
        return date.toISOString().split('T')[0]
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <div className='bg-muted text-xl p-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90'>
                    <BsPencil />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Education</AlertDialogTitle>
                    <AlertDialogDescription>
                        {data.image && (
                            <Image
                                width={150}
                                height={150}
                                alt=''
                                src={data.image}
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
                                School Name or title
                            </Label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                value={data.title}
                                placeholder='School name or title'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid w-full items-center gap-2 mb-2'>
                            <Label className='!text-left' htmlFor='description'>
                                Description
                            </Label>
                            <Input
                                type='text'
                                id='description'
                                name='description'
                                value={data.description}
                                placeholder='Insert your description ...'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid w-full items-center gap-2 mb-2'>
                            <Label className='!text-left' htmlFor='startYear'>
                                Start Year
                            </Label>
                            <Input
                                type='date'
                                id='startYear'
                                name='startYear'
                                value={data.startYear}
                                placeholder='Insert your Start Year ...'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid w-full items-center gap-2 mb-2'>
                            <Label className='!text-left' htmlFor='endYear'>
                                End Year
                            </Label>
                            <Input
                                type='date'
                                id='endYear'
                                name='endYear'
                                value={data.endYear}
                                placeholder='Insert your End Year ...'
                                onChange={handleChange}
                            />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={submitLink} disabled={isLoading}>
                        Edit Education
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditEdu
