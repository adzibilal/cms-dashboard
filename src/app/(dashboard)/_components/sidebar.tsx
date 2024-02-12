import { MdOutlineSpaceDashboard, MdOutlineWorkOutline } from 'react-icons/md'
import { GoProjectRoadmap } from 'react-icons/go'
import { IoSchoolOutline } from 'react-icons/io5'
import { PiLinkSimpleBold } from 'react-icons/pi'
import { RiContactsLine } from "react-icons/ri";

import React from 'react'
import Image from 'next/image'

const Sidebar = () => {
    return (
        <div className='border-r h-full p-5'>
            <Image width={50} height={50} alt='' src='/images/logo-adzi.png'  className='mb-10 dark:invert'/>
            <div className='flex flex-col gap-1'>
                <div className='mb-2'>
                    <div className='text-sm font-semibold mb-1'>Statistic</div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <MdOutlineSpaceDashboard />
                        <div className='text-sm'>Dashboard</div>
                    </div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <GoProjectRoadmap />
                        <div className='text-sm'>Project</div>
                    </div>
                </div>
                <div className='mb-2'>
                    <div className='text-sm font-semibold mb-1'>
                        Master Data
                    </div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <IoSchoolOutline />
                        <div className='text-sm'>Education</div>
                    </div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <MdOutlineWorkOutline />
                        <div className='text-sm'>Experience</div>
                    </div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <PiLinkSimpleBold  />
                        <div className='text-sm'>Links</div>
                    </div>
                    <div className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer'>
                        <RiContactsLine />
                        <div className='text-sm'>Contact Settings</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
