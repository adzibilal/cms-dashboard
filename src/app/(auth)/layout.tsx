import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className='container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
                <Link
                    href='/examples/authentication'
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'absolute right-4 top-4 md:right-8 md:top-8 hidden'
                    )}>
                    Login
                </Link>
                <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
                    <div className='absolute inset-0' />
                    <div className='relative z-20 flex items-center text-lg font-medium'>
                        <Image className='dark:invert' src='/images/logo-adzi.png' width={75} height={75} alt=''/>
                    </div>
                    <div className='relative z-20 mt-auto'>
                        <blockquote className='space-y-2 text-zinc-600 dark:text-white'>
                            <p className='text-lg'>
                                &ldquo;This library has saved me countless hours
                                of work and helped me deliver stunning designs
                                to my clients faster than ever before.&rdquo;
                            </p>
                            <footer className='text-sm'>Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className='lg:p-8 max-md:flex max-md:justify-center max-md:items-center max-md:h-screen'>{children}</div>
            </div>
        </>
    )
}
