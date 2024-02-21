import React from 'react'
import { Links } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

const PreviewLinks = ({ links }: { links: Links[] }) => {
    return (
        <div className='dark:bg-zinc-800 bg-muted rounded-3xl overflow-hidden max-w-md mx-auto p-5 min-h-[80vh] pt-16 relative'>
            <div className="dark:bg-zinc-950 bg-white w-[50%] h-10 absolute top-0 rounded-b-lg left-[50%] translate-x-[-50%]"></div>
            {links.map((link, index) => (
                <div
                    key={index}
                    className={`dark:bg-zinc-700 bg-zinc-200 text-center p-3 mb-2 rounded-md ${
                        link.important ? 'animate-bounce mt-6' : ''
                    }`}>
                    <Link
                        href={link.link!}
                        target='_blank'
                        className='flex items-center gap-3'>
                        <Image
                            src={link.image!}
                            alt='icon'
                            width={50}
                            height={50}
                            className='rounded-md aspect-square overflow-hidden object-cover'
                        />
                        <p className='dark:text-white text-gray-500'>{link.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default PreviewLinks
