'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineSpaceDashboard, MdOutlineWorkOutline } from 'react-icons/md'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoSchoolOutline } from 'react-icons/io5'
import { PiLinkSimpleBold } from 'react-icons/pi'
import { RiContactsLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

const menuItems = [
    {
        icon: <MdOutlineSpaceDashboard />,
        text: 'Dashboard',
        path: '/dashboard'
    },
    { icon: <GoProjectRoadmap />, text: 'Project', path: '/project' },
    { icon: <IoSchoolOutline />, text: 'Education', path: '/education' },
    { icon: <MdOutlineWorkOutline />, text: 'Experience', path: '/experience' },
    { icon: <PiLinkSimpleBold />, text: 'Links', path: '/links' },
    {
        icon: <RiContactsLine />,
        text: 'Contact Settings',
        path: '/contact-settings'
    }
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className='md:border-r h-full md:p-5'>
            <Image
                width={50}
                height={50}
                alt=''
                src='/images/logo-adzi.png'
                className='mb-10 dark:invert'
            />
            <div className='flex flex-col gap-1'>
                <div className='text-sm font-semibold mb-1'>
                    Menu
                </div>
                {menuItems.map((menuItem, index) => (
                    <div key={index} className='mb-2'>
                        <Link
                            href={menuItem.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-muted ${
                                pathname === menuItem.path ? 'bg-muted' : ''
                            }`}>
                            {menuItem.icon}
                            <div className='text-sm'>{menuItem.text}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
