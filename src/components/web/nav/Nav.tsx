import React from 'react'
import Image from 'next/image'
import { Flip, Search2, ArrowDown, PersonSignIn, Cart, Notification, Menu, Arrow2, ArrowWhiteDown, CloseDraw, Flip2, ArrowRight } from '../../../assets'
import Link from 'next/link'
import { getMyProfile } from '../../../redux/features/accountSlice'
import { getProductsCategory } from '../../../redux/features/productSlice'
import { logout } from '../../../redux/features/authSlice'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { useEffect, useState } from 'react'
import { FaUser, FaBox, FaHeart } from 'react-icons/fa'
import { getCart } from '../../../redux/features/cartSlice'
import { useRouter } from 'next/router'


const Nav = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { query } = useRouter() as any

    const { cartItems } = useAppSelector((state) => state.cart)
    const { isAuthenticated, token } = useAppSelector((state) => state.auth)
    const { loading, productsCategory } = useAppSelector((state) => state.product)


    const { profile } = useAppSelector((state) => state.account)
    const [fullName, setFullName] = useState('')
    const [totalCart, setTotalCart] = useState(0)
    const [searchBy, setSearchBy] = useState('Get Products')
    const [showSearchBy, setShowSearchBy] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false)

    useEffect(() => {
        if (cartItems) {
            let total = 0
            cartItems.map((item: any) => {
                total = total + item.numberOfItems
            })
            setTotalCart(total)
        }
    }, [cartItems])

    useEffect(() => {
        if (query) {
            setSearchTerm(query.search)
        } else {
            setSearchTerm('')
        }
    }, [query])

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyProfile(token))
            dispatch(getCart(token))
        }
        dispatch(getProductsCategory(''))
    }, [dispatch, isAuthenticated, token])

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName)
        }
    }, [profile])

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleLogout = () => {
        dispatch(logout())
        setIsProfileOpen(false)
    }

    useEffect(() => {
        if (isAuthenticated) {
            setIsAuthenticatedUser(true)
        } else {
            setIsAuthenticatedUser(false)
        }
    }, [isAuthenticated])

    const [showSidebar, setShowSidebar] = useState('-left-72');

    const toggleSidebar = () => {
        if (showSidebar === '-left-72') {
            setShowSidebar('left-0')
        } else {
            setShowSidebar('-left-72')
        }
    }

    return (
        <>
            <nav className='sticky top-0 z-[50]'>
                {/* top nav */}
                <div className="hidden md:flex flex-row justify-between items-center bg-primary4 py-1 px-20">
                    <p className="text-white text-xs font-light">Up to 70% off the store</p>
                    <div className="flex flex-row items-center">
                        <select className="bg-primary4 text-white text-xs font-light focus:outline-none">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                </div>

                {/* middle nav */}
                <div className="bg-primary3 p-4 md:py-6 md:px-20">

                    {/* mobile nav */}
                    <div className="md:hidden">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-4">
                                <Image src={Menu} alt="menu" onClick={toggleSidebar} className='cursor-pointer' />

                                <Link href="/">
                                    <a>
                                        <Image src={Flip} alt="logo" width={50} height={24} />
                                    </a>
                                </Link>

                            </div>

                            <div className="flex flex-row items-center">
                                {isAuthenticatedUser ? (
                                    <div className="flex flex-row items-center justify-center rounded-full w-10 h-10 mr-2 cursor-pointer relative" onClick={toggleProfile}>
                                        <Image src={PersonSignIn} alt="PersonSignIn" />
                                        {isProfileOpen && (
                                            <div className="absolute top-[40px] right-[-20px] z-10">
                                                <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg py-4">

                                                    <div className='flex justify-center items-center p-3'>
                                                        <button
                                                            className="w-full bg-primary3 text-white text-sm font-medium px-4 py-2 rounded-full md:rounded-md md:w-48 relative overflow-hidden btn"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                        </button>
                                                    </div>

                                                    <Link href={'/dashboard'} >
                                                        <a className='flex items-center gap-3 cursor-pointer text-gray20 text-base font-medium hover:bg-primary6 hover:text-white px-4 py-3'>
                                                            <FaUser className="text-sm" />
                                                            <p>My Account</p>
                                                        </a>
                                                    </Link>

                                                    <Link href={'/orders'} >
                                                        <a className='flex items-center gap-3 cursor-pointer text-gray20 text-base font-medium hover:bg-primary6 hover:text-white px-4 py-3'>
                                                            <FaBox className="text-sm" />
                                                            <p>Orders</p>
                                                        </a>
                                                    </Link>

                                                    <Link href={'#'} >
                                                        <a className='flex items-center gap-3 cursor-pointer text-gray20 text-base font-medium hover:bg-primary6 hover:text-white px-4 py-3'>
                                                            <FaHeart className="text-sm" />
                                                            <p>Saved Items</p>
                                                        </a>
                                                    </Link>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (

                                    <div className="flex flex-row items-center justify-center rounded-full w-10 h-10 mr-2 cursor-pointer relative" onClick={toggleProfile}>
                                        <Image src={PersonSignIn} alt="PersonSignIn" />
                                        {isProfileOpen && (
                                            <div className="absolute top-[40px] right-[-20px] z-10">
                                                <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg">

                                                    <div className='flex justify-center items-center p-3'>
                                                        <button
                                                            className="w-full bg-primary3 text-white text-[14px] font-medium px-4 py-2 rounded-full md:rounded-md md:w-48 relative overflow-hidden btn"
                                                            onClick={() => router.push('/login')}
                                                        >
                                                            Login/Register
                                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}


                                <Link href="#">
                                    <div className="flex flex-row items-center justify-center rounded-full w-10 h-10 mr-2 cursor-pointer relative">
                                        <div className="absolute -top-0 -right-0 bg-red border-none text-white text-xs font-light rounded-full w-5 h-5 flex flex-row items-center justify-center z-10">3</div>
                                        <Image src={Notification} alt="Notification" />
                                    </div>
                                </Link>

                                <Link href="/cart">
                                    <a className="flex flex-row items-center justify-center rounded-full w-10 h-10 mr-2 cursor-pointer relative">
                                        <div className="absolute -top-0 -right-0 bg-red border-none text-white text-xs font-light rounded-full w-5 h-5 flex flex-row items-center justify-center z-10">{totalCart}</div>
                                        <Image src={Cart} alt="Cart" />
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-center mt-4 w-full">
                            <form className='relative w-full'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (searchBy.includes('Products')) {
                                        router.push(`/search-products?search=${searchTerm}`)
                                    } else if (searchBy.includes('Services')) {
                                        router.push(`/search-services?search=${searchTerm}`)
                                    }
                                }}
                            >
                                <div className="flex justify-center items-center relative">
                                    <input type="text" className="w-full h-[45px] border focus:outline-none focus:border-primary3 border-primary3 rounded-[30px] pl-10 relative text-base font-light" placeholder={`Search ${searchBy.split(' ')[1]}`}
                                        value={searchTerm || ''}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                        }}
                                    />
                                    <button type='button' className={`w-[90px] h-[45px]  text-white rounded-[30px] 
                                    absolute right-0 top-0 text-sm font-medium flex items-center justify-center gap-2 ${showSearchBy ? 'bg-primary6' : 'bg-primary4'}`}
                                        onClick={
                                            () => {
                                                setShowSearchBy(!showSearchBy)
                                            }
                                        }
                                    >
                                        <span>
                                            {searchBy.split(' ')[1]}
                                        </span>
                                        <Image src={ArrowWhiteDown} alt="ArrowWhiteDown" />
                                    </button>
                                    <div className='absolute top-0 left-1 flex flex-row items-center justify-center h-full w-10'>
                                        <Image src={Search2} alt="Search" />
                                    </div>

                                    {showSearchBy && (
                                        <div className="absolute top-[50px] right-0 z-10">
                                            <div className="flex flex-col w-[250px] bg-white rounded-lg shadow-lg">
                                                <div className='flex items-center cursor-pointer hover:bg-primary6 px-4 py-3 mt-[3px] text-sm text-gray11 font-medium hover:text-white' onClick={() => {
                                                    setSearchBy('Get Products')
                                                    setShowSearchBy(false)
                                                }}>
                                                    <p>Get Products</p>
                                                </div>

                                                <div className='flex items-center cursor-pointer hover:bg-primary6 px-4 py-3 mb-[3px] text-sm text-gray11 font-medium hover:text-white' onClick={() => {
                                                    setSearchBy('Get Services')
                                                    setShowSearchBy(false)
                                                }}>
                                                    <p>Get Services</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* desktop nav */}
                    <div className="hidden md:flex flex-row items-center justify-between">

                        <div className="relative">
                            <Link href="/">
                                <a>
                                    <Image src={Flip} alt="Flip Logo" />
                                </a>
                            </Link>
                        </div>

                        <div className="flex flex-row items-center justify-center w-1/2">
                            <form className='relative w-full'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (searchBy.includes('Products')) {
                                        router.push(`/search-products?search=${searchTerm}`)
                                    } else if (searchBy.includes('Services')) {
                                        router.push(`/search-services?search=${searchTerm}`)
                                    }
                                }}
                            >
                                <div className="flex justify-center items-center relative">
                                    <input type="text" className="w-full h-[45px] border focus:outline-none focus:border-primary3 border-primary3 rounded-[30px] pl-10 relative text-base font-light" placeholder={`Search ${searchBy.split(' ')[1]}`}
                                        value={searchTerm || ''}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                        }}
                                    />
                                    <button type='button' className={`w-[150px] h-[45px]  text-white rounded-[30px] 
                                    absolute right-0 top-0 text-sm font-medium flex items-center justify-center gap-2 ${showSearchBy ? 'bg-primary6' : 'bg-primary4'}`}
                                        onClick={
                                            () => {
                                                setShowSearchBy(!showSearchBy)
                                            }
                                        }
                                    >
                                        <span>{searchBy}</span>
                                        <Image src={ArrowWhiteDown} alt="ArrowWhiteDown" />
                                    </button>
                                    <div className='absolute top-0 left-1 flex flex-row items-center justify-center h-full w-10'>
                                        <Image src={Search2} alt="Search" />
                                    </div>

                                    {showSearchBy && (
                                        <div className="absolute top-[50px] right-0 z-10">
                                            <div className="flex flex-col w-[250px] bg-white rounded-lg shadow-lg">
                                                <div className='flex items-center cursor-pointer hover:bg-primary6 px-4 py-3 mt-[3px] text-sm text-gray11 font-medium hover:text-white' onClick={() => {
                                                    setSearchBy('Get Products')
                                                    setShowSearchBy(false)
                                                }}>
                                                    <p>Get Products</p>
                                                </div>

                                                <div className='flex items-center cursor-pointer hover:bg-primary6 px-4 py-3 mb-[3px] text-sm text-gray11 font-medium hover:text-white' onClick={() => {
                                                    setSearchBy('Get Services')
                                                    setShowSearchBy(false)
                                                }}>
                                                    <p>Get Services</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-8">

                            {isAuthenticatedUser ? (
                                <div className="flex flex-row items-center cursor-pointer relative" onClick={toggleProfile}>
                                    <Image src={PersonSignIn} alt="PersonSignIn" />
                                    <div className='flex flex-col'>
                                        <p className="text-white text-xs font-medium ml-2">{fullName}</p>
                                    </div>
                                    <div className="absolute top-[4px] right-[-18px]">
                                        <Image src={Arrow2} alt="Arrow2" />
                                    </div>

                                    {isProfileOpen && (
                                        <div className="absolute top-[40px] right-[-20px] z-10">
                                            <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg py-4">

                                                <div className='flex justify-center items-center p-3'>
                                                    <button
                                                        className="bg-primary3 text-white text-sm font-medium px-4 py-2 rounded-full md:rounded-md md:w-48 relative overflow-hidden btn"
                                                        onClick={handleLogout}
                                                    >
                                                        Logout
                                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                    </button>
                                                </div>

                                                <Link href={'/dashboard'} >
                                                    <a className='flex items-center gap-3 cursor-pointer text-gray20 text-sm font-medium hover:bg-primary6 hover:text-white px-4 py-2'>
                                                        <FaUser className="text-base" />
                                                        <p>My Account</p>
                                                    </a>
                                                </Link>

                                                <Link href={'/orders'} >
                                                    <a className='flex items-center gap-3 cursor-pointer text-gray20 text-sm font-medium hover:bg-primary6 hover:text-white px-4 py-2'>
                                                        <FaBox className="text-base" />
                                                        <p>Orders</p>
                                                    </a>
                                                </Link>

                                                <Link href={'#'} >
                                                    <a className='flex items-center gap-3 cursor-pointer text-gray20 text-sm font-medium hover:bg-primary6 hover:text-white px-4 py-2'>
                                                        <FaHeart className="text-base" />
                                                        <p>Saved Items</p>
                                                    </a>
                                                </Link>

                                            </div>
                                        </div>
                                    )}

                                </div>
                            ) : (

                                <div className="flex flex-row items-center cursor-pointer relative" onClick={toggleProfile}>
                                    <Image src={PersonSignIn} alt="PersonSignIn" />
                                    <div className='flex flex-col'>
                                        <p className="text-white text-[8px] font-medium ml-2">Sign In</p>
                                        <p className="text-white text-xs font-medium ml-2">Account</p>
                                    </div>
                                    <div className="absolute top-[10px] right-[-18px]">
                                        <Image src={Arrow2} alt="Arrow2" />
                                    </div>

                                    {isProfileOpen && (
                                        <div className="absolute top-[40px] right-[-20px] z-10">
                                            <div className="flex flex-col w-[200px] bg-white rounded-lg shadow-lg">

                                                <div className='flex justify-center items-center p-3'>
                                                    <button
                                                        className="bg-primary3 text-white text-[14px] font-medium px-4 py-2 rounded-full md:rounded-md md:w-48 relative overflow-hidden btn"
                                                        onClick={() => router.push('/login')}
                                                    >
                                                        Login/Register
                                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    )}


                                </div>
                            )}


                            <Link href="#">
                                <a className="flex flex-row items-center cursor-pointer relative">
                                    <Image src={Notification} alt="PersonSignIn" />
                                    <div className='flex flex-col'>
                                        <p className="text-white text-xs font-medium ml-2">Notification</p>
                                    </div>

                                    <div className="absolute top-[-13px] left-[5px] bg-red border-none text-white text-[10px] font-light rounded-full w-5 h-5 flex flex-row items-center justify-center z-10">3</div>
                                </a>
                            </Link>

                            <Link href="/cart">
                                <a className="flex flex-row items-center cursor-pointer relative">
                                    <Image src={Cart} alt="Cart" />
                                    <div className='flex flex-col'>
                                        <p className="text-white text-xs font-medium ml-2">Cart</p>
                                    </div>

                                    <div className="absolute top-[-13px] left-[14px] bg-red border-none text-white text-[10px] font-light rounded-full w-5 h-5 flex flex-row items-center justify-center z-10">{totalCart}</div>
                                </a>
                            </Link>


                        </div>

                    </div>

                </div>

                {/* bottom nav */}
                <div className="hidden flex-row justify-center items-center bg-white py-2.5 px-20">
                    <ul className="flex flex-row items-center justify-between">
                        <li className="text-gray22 text-xs font-medium mr-4">
                            <Link href="#">
                                <a>Products</a>
                            </Link>
                        </li>

                        <li className="text-gray22 text-xs font-medium mr-4">
                            <Link href="#">
                                <a className="flex flex-row items-center" >
                                    <span className="mr-2">Sellers</span>
                                    <Image src={ArrowDown} alt="Arrow Down" />
                                </a>
                            </Link>
                        </li>

                        <li className="text-gray22 text-xs font-medium mr-4">
                            <Link href="#">
                                <a className="flex flex-row items-center" >
                                    <span className="mr-2">Service</span>
                                    <Image src={ArrowDown} alt="Arrow Down" />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* mobile side bar */}
                <div className={`md:hidden h-screen fixed top-0 lg:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-[280px] z-10 transition-all duration-300`}>
                    <div className="flex flex-row items-center justify-between py-4 px-6 mb-2">
                        <div className="flex flex-row items-center">
                            <Image src={Flip2} alt="Logo" />
                        </div>
                        <div className="flex flex-row items-center cursor-pointer" onClick={toggleSidebar}>
                            <Image src={CloseDraw} alt="Close" />
                        </div>
                    </div>

                    <hr className='border[1px] border-gray24' />

                    {isAuthenticatedUser ? (
                        <>
                            <div className="flex flex-col items-start justify-start py-4 px-6 mb-2">
                                <h3 className='text-lg text-gray38 font-medium'>Account</h3>
                                <ul className="flex flex-col items-start justify-start mt-4">
                                    <li className="mb-4">
                                        <Link href="/dashboard">
                                            <a className='flex items-center gap-4'>
                                                <FaUser className="text-base text-gray20" />
                                                <span className='text-gray20 text-sm font-light'>My Account</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="/orders">
                                            <a className='flex items-center gap-4'>
                                                <FaBox className="text-base text-gray20" />
                                                <span className='text-gray20 text-sm font-light'>Orders</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link href="#">
                                            <a className='flex items-center gap-4'>
                                                <FaHeart className="text-base text-gray20" />
                                                <span className='text-gray20 text-sm font-light'>Saved Items</span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className='border[1px] border-gray24' />
                        </>
                    ) : (
                        ''
                    )}




                    <div className="flex flex-col items-start justify-start py-4 px-6 mb-2">
                        <h3 className='text-lg text-gray38 font-medium'>Category</h3>
                        <ul className="flex flex-col items-start justify-start mt-4 w-full">
                            {productsCategory.slice(0, 7).map((item: any, index: number) => (
                                <li className="mb-4 w-full" key={index}
                                    onClick={() => {
                                        toggleSidebar()
                                    }}
                                >
                                    <Link href={`/category/${item.categoryID}?category=${item.name}`}>
                                        <a className='flex items-center justify-between w-full'>
                                            <span className='text-gray22 text-sm font-light'>{item.name}</span>
                                            <Image src={ArrowRight} alt="arrow" />
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <hr className='border[1px] border-gray24' />


                    <div className="flex flex-col items-start justify-start py-4 px-6">
                        <ul className="flex flex-col items-start justify-start mt-4 w-full">
                            <li className="mb-4 w-full">
                                <Link href="#">
                                    <a className=''>
                                        <span className='text-gray22 text-sm font-light'>Contact Us</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="mb-4 w-full">
                                <Link href="#">
                                    <a className=''>
                                        <span className='text-gray22 text-sm font-light'>FAQ</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

        </>
    )
}



export default Nav