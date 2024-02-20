import React from 'react'
import { Card } from '@/components/ui/card'

const SkeletonLinkList = () => {
    return (
        <Card className={`mb-3 animate-pulse p-3 flex gap-3 items-center`}>
            <div className='bg-muted min-w-16 h-16 rounded-md'></div>
            <div className="w-full">
                <div className="bg-muted w-full max-w-80 h-5 rounded-md mb-2"></div>
                <div className="bg-muted w-full max-w-60 h-5 rounded-md"></div>
            </div>
        </Card>
    )
}

export default SkeletonLinkList
