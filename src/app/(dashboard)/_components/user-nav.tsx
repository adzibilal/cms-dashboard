'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getSession, login, logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserData {
    id: string
    email: string
    username: string
    name: string | null
    avatar: string | null
    role: string
}

export function UserNav() {
    const [userData, setUserData] = useState<UserData | null>(null) // Use UserData type
    const router = useRouter()

    useEffect(() => {
        async function fetchUserData() {
            const session = await getSession()
            console.error(session)
            if (session) {
                const userDataFromSession: UserData = {
                    id: session.credentialsData.id,
                    email: session.credentialsData.email,
                    username: session.credentialsData.username,
                    name: session.credentialsData.name,
                    avatar: session.credentialsData.avatar,
                    role: session.credentialsData.role
                }
                setUserData(userDataFromSession)
            }
        }

        fetchUserData()
    }, [])

    const handleLogout = async () => {
        await logout()
        router.push('/login')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='relative h-10 w-10 rounded-full'>
                    <Avatar className='h-10 w-10'>
                        <AvatarImage src='/avatars/01.png' alt='@shadcn' />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>
                            {userData ? userData.username : ''}
                        </p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            {userData ? userData.email : ''}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={async () => {
                        await logout()
                        router.push('/login')
                    }}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
