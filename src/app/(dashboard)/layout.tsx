import Navbar from './_components/navbar'
import SessionChecker from './_components/session-cheker'
import Sidebar from './_components/sidebar'

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className='grid grid-cols-[220px_1fr] min-h-screen'>
            <Sidebar />
            <div className=''>
                <Navbar />
                <div className='p-5'>{children}</div>
            </div>
        </div>
    )
}
