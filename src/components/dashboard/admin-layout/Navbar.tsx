import { FaBars } from 'react-icons/fa'
import Image from 'next/image'
import { Avatar, Notification2 } from '../../../assets'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Search2 } from '../../../assets'
import { getMyProfile } from '../../../redux/features/accountSlice'
import { getNotifications } from '../../../redux/features/notificationSlice'

const Navbar = ({ showSidebar, setShowSidebar, title }: { showSidebar: any, setShowSidebar: any, title: any }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { token, isAuthenticated, role } = useAppSelector((state) => state.auth)
    const { profile } = useAppSelector((state) => state.account)
    const { notifications } = useAppSelector((state) => state.notification)

    const [fullName, setFullName] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        if (!isAuthenticated && !token) {
            router.push('/login')
        } else {
            dispatch(getMyProfile(token))
            dispatch(getNotifications(''))
        }
    }, [token, isAuthenticated, router, dispatch])


    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName)
            setImage(profile.image)
        }
    }, [profile])

    return (
        <>
            <nav className="bg-white lg:ml-60 py-4 px-3 sticky top-0 z-10">
                <div className="container max-w-full mx-auto flex items-center justify-between md:pr-4 md:pl-4">

                    <div className="flex justify-between items-center w-full">
                        {/* title */}
                        <div className="flex items-center">
                            <FaBars className='lg:hidden cursor-pointer text-xl text-primary6 mr-3' onClick={() => setShowSidebar('left-0')} />
                            <h4 className="text-base text-primary6 md:text-xl font-medium">
                                {title}
                            </h4>
                        </div>

                        {/* search */}
                        <div className="hidden md:flex items-center">
                            <div className="relative">
                                <input type="text" className="bg-gray-100 border-[1px] border-gray24 rounded-[10px] w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search" />
                                <div className="absolute top-2 left-3">
                                    <Image src={Search2} alt="search" />
                                </div>
                            </div>
                        </div>

                        {/*profile */}
                        <div className="flex gap-10">
                            <div className='border-[1px] border-gray24 w-10 h-10 flex items-center justify-center rounded-[8px] cursor-pointer relative'>
                                {notifications && notifications.length > 0 && (
                                    <div className="absolute top-[-1px] right-[1px] bg-red5 border-none text-white text-[10px] font-light rounded-full w-4 h-4 flex flex-row items-center justify-center z-10">{notifications?.length}</div>
                                )}
                                <Image src={Notification2} alt="notification" />
                            </div>
                            <Link href={'/profile'}>
                                <a>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <h4 className="hidden md:block text-black-100 text-lg font-medium">
                                            {fullName}
                                        </h4>
                                        {image && <Image src={image} alt="avatar" width={40} height={40} className="rounded-full" />}
                                        {!image && <Image src={Avatar} alt="avatar" width={40} height={40} className="rounded-full" />}
                                    </div>
                                </a>
                            </Link>

                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar