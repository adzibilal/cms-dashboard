import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'
import { UserNav } from './user-nav'

const Navbar = () => {
    return (
        <div className='border-b flex gap-2 justify-end p-3'>
            <ThemeToggle />
            <UserNav />
        </div>
    )
}

export default Navbar
