'use client'
import { useEffect } from 'react'
import { getSession } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface SessionCheckerProps {
    redirectTo: string
    children: React.ReactNode
}

const SessionChecker: React.FC<SessionCheckerProps> = ({
    redirectTo,
    children
}) => {
    const router = useRouter()

    useEffect(() => {
        async function checkSessionAndRedirect() {
            const session = await getSession()
            if (!session) {
                router.push(redirectTo)
            }
        }

        checkSessionAndRedirect()
    }, [redirectTo, router])

    return <>{children}</>
}

export default SessionChecker
