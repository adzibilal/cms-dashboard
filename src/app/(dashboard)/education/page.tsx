'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ItemEducation from './_components/item-education'
import { Education } from '@prisma/client'
import AddEdu from './_components/add-edu'

const EducationPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [education, setEducation] = useState<Education[]>([])

    const getEducation = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/education', {
                method: 'GET'
            })
            if (!res.ok) {
                throw new Error('Failed to fetch education')
            }
            const data = await res.json()
            setEducation(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const refresh = () => {
        getEducation()
    }

    useEffect(() => {
        getEducation()
    }, [])

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className=''>
                    <div className='text-3xl'>Education Management</div>
                    <div className='text-muted-foreground'>
                        Manage your education
                    </div>
                </div>
                <AddEdu onSuccess={refresh}/>
            </div>
            <div className='grid grid-cols-5 mt-5 max-xl:grid-cols-3 max-md:grid-cols-2 gap-3'>
                {isLoading ? (
                    <></>
                ) : (
                    <>
                        {education.map(item => (
                            <ItemEducation
                                key={item.id}
                                edu={item}
                                refresh={refresh}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default EducationPage
