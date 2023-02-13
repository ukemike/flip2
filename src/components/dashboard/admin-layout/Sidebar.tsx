import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Flip, Logout, Wallet, Order, Inbox, Product, Dashboard, Gig, Request, Profile, Repair } from '../../../assets'
import { FaMapMarkerAlt, FaTimes, FaUser, FaHandHoldingUsd, } from 'react-icons/fa'
import { BiBarChart, } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import { logout } from '../../../redux/features/authSlice'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'

const Sidebar = (props: any) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { role, merchant_type } = useAppSelector((state) => state.auth)

    const [showSidebar, setShowSidebar] = useState('-left-64');
    const [currenRoute, setCurrentRoute] = useState('')

    useEffect(() => {
        setCurrentRoute(router.pathname)
    }, [router])


    const handleLogout = () => {
        dispatch(logout())
    }

    const [isMerchantType, setIsMerchantType] = useState('' as any)
    const [isRole, setIsRole] = useState('' as any)

    useEffect(() => {
        setIsMerchantType(merchant_type)
        setIsRole(role)
    }, [merchant_type, role])


    return (
        <>
            <Navbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                title={props.title}
            />
            <div className={`h-screen fixed top-0 lg:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-primary6 w-60 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <div className="flex items-center justify-center w-full">
                        <Link href="/">
                            <a className="flex items-center justify-center w-full">
                                <Image src={Flip} alt="Flip Logo" />
                            </a>
                        </Link>
                    </div>
                    <FaTimes
                        className="lg:hidden absolute top-0 right-0 cursor-pointer text-xl text-white"
                        onClick={() => setShowSidebar('-left-64')}
                    />

                    <div className="flex flex-col">
                        <hr className="my-3 min-w-full border-gray2 border-opacity-50" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-2">
                                <Link href="/dashboard">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/dashboard' ? 'bg-primary4' : ''}`}>
                                        <Image src={Dashboard} alt="Dashboard" />
                                        Dashboard
                                    </a>
                                </Link>
                            </li>

                            <li className="rounded-lg mb-2 ">
                                <Link href="/inbox">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/inbox' ? 'bg-primary4' : ''}`}>
                                        <Image src={Inbox} alt="Inbox" />
                                        Inbox
                                    </a>
                                </Link>
                            </li>

                            <li className="rounded-lg mb-2">
                                <Link href="/orders">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/orders' ? 'bg-primary4' : ''}`}>
                                        <Image src={Order} alt="Orders" />
                                        Orders
                                    </a>
                                </Link>
                            </li>

                            {isRole === 'merchant' && isMerchantType === 'personal' && (
                                <>
                                    <li className="rounded-lg mb-2">
                                        <Link href="/proposals">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/proposals' ? 'bg-primary4' : ''}`}>
                                                <FaHandHoldingUsd />
                                                Proposals
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="rounded-lg mb-2">
                                        <Link href="/jobs">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/jobs' ? 'bg-primary4' : ''}`}>
                                                <Image src={Gig} alt="Job" />
                                                Gigs
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            )}

                            {isRole === 'consumer' && (
                                <>
                                    <li className="rounded-lg mb-2">
                                        <Link href="/job">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/job' ? 'bg-primary4' : ''}`}>
                                                <Image src={Gig} alt="Job" />
                                                Gigs
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="rounded-lg mb-2">
                                        <Link href="/requests">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/requests' ? 'bg-primary4' : ''}`}>
                                                <Image src={Request} alt="Request" />
                                                Requests
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            )}

                            {isRole === 'merchant' && isMerchantType === 'business' && (
                                <>
                                    <li className="rounded-lg mb-2">
                                        <Link href="/products">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/products' ? 'bg-primary4' : ''}`}>
                                                <BiBarChart />
                                                Products
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="rounded-lg mb-2">
                                        <Link href="/services">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/services' ? 'bg-primary4' : ''}`}>
                                                <Image src={Repair} alt="Service" />
                                                Services
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="rounded-lg mb-2">
                                        <Link href="/requests">
                                            <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/requests' ? 'bg-primary4' : ''}`}>
                                            <Image src={Request} alt="Request" />
                                                Requests
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            )}


                            <li className="rounded-lg mb-2">
                                <Link href="/wallet">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/wallet' ? 'bg-primary4' : ''}`}>
                                        <Image src={Wallet} alt="Wallet" />
                                        Wallet
                                    </a>
                                </Link>
                            </li>


                            <li className="rounded-lg mb-2">
                                <Link href="/profile">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium font-nunito px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/profile' ? 'bg-primary4' : ''}`}>
                                        <Image src={Profile} alt="Profile" />
                                        Profile
                                    </a>
                                </Link>
                            </li>



                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                            {/* <li className="rounded-lg mb-2">
                                <Link href="/settings">
                                    <a className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 ${currenRoute === '/settings' ? 'bg-primary4' : ''}`}>
                                        <TbSettings />
                                        Settings
                                    </a>
                                </Link>
                            </li> */}

                            <li className="rounded-lg mb-2">
                                <div className={`flex items-center gap-4 text-base text-white font-medium px-4 py-3 rounded-lg hover:bg-primary4 cursor-pointer`} onClick={handleLogout}>
                                    <Image src={Logout} alt="Logout" />
                                    Log Out
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar