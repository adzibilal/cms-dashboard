'use client'
import React, { ChangeEvent, useState } from 'react'
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

const AddLinks = ({ onSuccess }: { onSuccess: () => void }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        link: '',
        important: false,
        active: true
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSwitchChange = (name: keyof typeof data) => {
        setData(prevData => ({ ...prevData, [name]: !prevData[name] }))
    }

    const submitLink = async () => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json()
                toast('Link added successfully', {
                    icon: '✅',
                    position: 'top-center'
                })
                setOpen(false)
                onSuccess(); 
            } else {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to add link')
            }
        } catch (error) {
            console.error(error)
            toast('Failed to add link', {
                icon: '❌',
                position: 'top-center'
            })
        }

        setIsLoading(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant='outline'>New Link</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add New Link</AlertDialogTitle>
                    <AlertDialogDescription>
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
                        Add Link
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddLinks
