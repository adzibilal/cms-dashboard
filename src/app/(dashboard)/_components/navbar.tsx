import { ThemeToggle } from '@/components/theme-toggle'
import React from 'react'
import { UserNav } from './user-nav'
import { Button } from '@/components/ui/button'
import { CgMenu } from 'react-icons/cg'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Sidebar from './sidebar'

const Navbar = () => {
    return (
        <div className='border-b flex gap-2 justify-end p-3 items-center'>
            <ThemeToggle />
            <UserNav />
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className='rounded-full'>
                            <CgMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Navbar
