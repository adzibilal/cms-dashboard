'use client'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { login } from '@/lib/auth'
import { NextApiResponse } from 'next'

interface LoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginAuthForm({ className, ...props }: LoginAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const router = useRouter()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json()
                await login(responseData)
                toast('Login success', {
                    icon: '✅',
                    position: 'top-center'
                })
                router.push('/dashboard')
            } else {
                // Jika gagal, tangani kesalahan
                const errorData = await response.json()
                throw new Error(errorData.message || 'Login failed')
            }
        } catch (error) {
            console.error(error)
            toast('Username or Password is wrong', {
                icon: '❌',
                position: 'top-center'
            })
        }

        setIsLoading(false)
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='username'>
                            Username
                        </Label>
                        <Input
                            id='username'
                            name='username' // Added name attribute
                            value={data.username}
                            onChange={handleInputChange} // Added onChange handler
                            placeholder='Enter your Username'
                            type='text'
                            autoCapitalize='none'
                            autoComplete='username'
                            autoCorrect='off'
                            disabled={isLoading}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='password'>
                            Password
                        </Label>
                        <Input
                            id='password'
                            name='password' // Added name attribute
                            value={data.password}
                            onChange={handleInputChange} // Added onChange handler
                            placeholder='Enter your password'
                            type='password'
                            autoCapitalize='none'
                            autoComplete='password'
                            autoCorrect='off'
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant='outline' type='button' disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Icons.google className='mr-2 h-4 w-4' />
                )}{' '}
                Google
            </Button>
        </div>
    )
}
