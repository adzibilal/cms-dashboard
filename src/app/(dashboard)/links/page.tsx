'use client'
import React, { useEffect, useState } from 'react'
import ItemLinks from './_components/item-links'
import { Links } from '@prisma/client'
import AddLinks from './_components/add-links'

const LinksPage = () => {
    const [links, setLinks] = useState<Links[]>([])

    const getLinks = async () => {
        try {
            const res = await fetch('/api/links', {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Failed to fetch links')
            }
            const data = await res.json()
            setLinks(data)
        } catch (error) {
            console.error('Error fetching links:', error)
        }
    }

    const refreshLinks = async () => {
        await getLinks();
    };

    useEffect(() => {
        getLinks()
    }, [])

    return (
        <div className='grid grid-cols-2 gap-3'>
            <div className=''>
                <div className='pb-5 flex items-center justify-between gap-3'>
                    <div className=''>
                        <div className='text-3xl'>Links Management</div>
                        <div className='text-muted-foreground'>
                            Lorem Ipsum dolor sit amet.
                        </div>
                    </div>
                    <AddLinks onSuccess={refreshLinks} />
                </div>
                <div className=''>
                    {links.map(link => (
                        <ItemLinks key={link.id} links={link} onSuccess={refreshLinks} />
                    ))}
                </div>
            </div>
            <div className=''></div>
        </div>
    )
}

export default LinksPage
