import React from 'react'
import Image from 'next/image'
import { Search2, Empty, PaginationNext, PaginationPrev, NoImage } from '../../../assets'
import { FaEllipsisH, FaTimes, } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { formatAmount, formatDate, shortenText } from '../../../utils/functions'
import Loader from '../loader/Loader'

const Requests = (props: any) => {

    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    let [dropdown, setDropdown] = React.useState(false)
    const [isOpen2, setIsOpen2] = React.useState(false)
    const [accept, setAccept] = React.useState(false)
    const [reject, setReject] = React.useState(false)
    const [requestID, setRequestID] = React.useState(0)
    const [singleRequest, setSingleRequest] = React.useState({} as any)
    const [imagesToDisplay, setImagesToDisplay] = React.useState([] as any)
    const [serviceName, setServiceName] = React.useState('')
    const [price, setPrice] = React.useState(0)
    const [paymentStatus, setPaymentStatus] = React.useState('')
    const [requestStatus, setRequestStatus] = React.useState('')
    const [requestDate, setRequestDate] = React.useState('')

    const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchServiceRequest, search } = useSearchAndPagination(props.serviceRequests, itemsPerPage);

    const handleItemsPerPage = (e: any) => {
        setItemsPerPage(e.target.value);
    }

    const checkAll = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox: any) => {
            checkbox.checked = true
        })
    }
    const uncheckAll = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        checkboxes.forEach((checkbox: any) => {
            checkbox.checked = false
        })
    }

    const handleDropdown = (id: any, request: any) => {
        if (dropdown === false) {
            setDropdown(id)
            setRequestID(request.requestID)
            setSingleRequest(request)
        }
        else if (dropdown === id) {
            setDropdown(false)
        }
        else {
            setDropdown(id)
            setRequestID(request.requestID)
            setSingleRequest(request)
        }
    }

    const toggleDrawer2 = () => {
        setIsOpen2((prevState) => !prevState)
        setDropdown(false)
    }

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])

    React.useEffect(() => {
        if (props.successAcceptRejectServiceRequest || props.errorAcceptRejectServiceRequest) {
            setDropdown(false)
        }
    }, [props.successAcceptRejectServiceRequest, props.errorAcceptRejectServiceRequest])

    React.useEffect(() => {
        if (singleRequest && singleRequest.service && singleRequest.service.service) {
            setImagesToDisplay(singleRequest.service.service.images || [])
            setServiceName(singleRequest.service.service.serviceName || '')
            setPrice(singleRequest.service.service.pricing || 0)
            setPaymentStatus(singleRequest.paymentStatus || '')
            setRequestStatus(singleRequest.requestStatus || '')
            setRequestDate(formatDate(singleRequest.requestDate) || '')
        }
    }, [singleRequest])


    const handleAcceptRequest = (data: any) => {
        props.acceptServiceRequest({
            requestID: requestID,
        })
    }

    const handleRejectRequest = (data: any) => {
        props.rejectServiceRequest({
            requestID: requestID,
        })
    }

    const tableHead = [
        'Serial No',
        'Name',
        'Price',
        'Payment Status',
        'Amount Paid',
        'Request Status',
        'Date Requested',
        'Action',
    ]


    return (
        <>
            {props.loadingFetcServiceRequest ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center mb-5">
                        <div className="flex items-center w-full">
                            <div className="flex items-center relative w-full">
                                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search request"
                                    value={search}
                                    onChange={handleSearchServiceRequest}
                                />
                                <div className="absolute top-2 left-3">
                                    <Image src={Search2} alt="search" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 w-full">
                        </div>
                    </div>

                    <div className="card mb-4">

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-2 text-black align-middle border-b border-solid border-gray5 py-3 text-base font-medium whitespace-nowrap text-left">
                                            <input type="checkbox" className="w-3 h-3"
                                                onClick={
                                                    (e: any) => {
                                                        if (e.target.checked) {
                                                            checkAll()
                                                        } else {
                                                            uncheckAll()
                                                        }
                                                    }}
                                            />
                                        </th>
                                        {tableHead.map((item: any, index: number) => (
                                            <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                                                {item}
                                            </th>
                                        ))}

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 && currentItems.map((request: any, index: number) => (
                                        <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                <input type="checkbox" className="w-3 h-3" />
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {request.service.service.serial}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {shortenText(request.service.service.serviceName, 20)}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                ₦ {formatAmount(request.service.service.pricing)}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {request.paymentStatus === 'Pending' && (
                                                    <span className="bg-yellow text-white px-4 py-1 rounded-[10px] text-xs opacity-80">{request.paymentStatus}</span>
                                                )}
                                                {request.paymentStatus === 'Initiated' && (
                                                    <span className="bg-primary4 text-white px-4 py-1 rounded-[10px] text-xs opacity-80">{request.paymentStatus}</span>
                                                )}
                                                {request.paymentStatus === 'Completed' && (
                                                    <span className="bg-green4 text-white px-4 py-1 rounded-[10px] text-xs opacity-80">{request.paymentStatus}</span>
                                                )}
                                                {request.paymentStatus === 'FailedCompleted' && (
                                                    <span className="bg-red text-white px-4 py-1 rounded-[10px] text-xs opacity-80">{request.paymentStatus}</span>
                                                )}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {formatAmount(request.amountPaid)}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {request.requestStatus === 'Requested' && (
                                                    <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{request.requestStatus}</span>
                                                )}
                                                {request.requestStatus === 'Accepted' && (
                                                    <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{request.requestStatus}</span>
                                                )}
                                                {request.requestStatus === 'Completed' && (
                                                    <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{request.requestStatus}</span>
                                                )}
                                                {request.requestStatus === 'Ongoing' && (
                                                    <span className="text-xs font-light text-white bg-primary4 px-4 py-1 rounded-[10px] opacity-80">{request.requestStatus}</span>
                                                )}
                                                {request.requestStatus === 'Rejected' && (
                                                    <span className="text-xs font-light text-white bg-red px-4 py-1 rounded-[10px] opacity-80">{request.requestStatus}</span>
                                                )}
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {formatDate(request.requestDate)}
                                            </td>

                                            <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                                                    handleDropdown(request.requestID, request)
                                                }} />

                                                <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                                                    display: dropdown === request.requestID ? 'block' : 'none'
                                                }}>
                                                    <ul>

                                                        <li>
                                                            <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                                                onClick={toggleDrawer2}
                                                            >
                                                                View
                                                            </div>
                                                        </li>

                                                        {request.requestStatus === 'Requested' && (
                                                            <div>
                                                                {props.loadingAcceptRejectServiceRequest && accept ? (
                                                                    <li>
                                                                        <div className="px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white flex items-center gap-1">
                                                                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                                            </svg>
                                                                            Accepting...
                                                                        </div>
                                                                    </li>
                                                                ) : (
                                                                    <li>
                                                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                                                            () => {
                                                                                setAccept(true)
                                                                                handleAcceptRequest(request.requestID)
                                                                            }
                                                                        }>Accept</div>
                                                                    </li>
                                                                )}
                                                            </div>
                                                        )}

                                                        {request.requestStatus === 'Requested' && (
                                                            <div>
                                                                {props.loadingAcceptRejectServiceRequest && reject ? (
                                                                    <li>
                                                                        <div className="px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white flex items-center gap-1">
                                                                            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                                            </svg>
                                                                            Rejecting...
                                                                        </div>
                                                                    </li>
                                                                ) : (
                                                                    <li>
                                                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer" onClick={
                                                                            () => {
                                                                                setReject(true)
                                                                                handleRejectRequest(request.requestID)
                                                                            }
                                                                        }>Reject</div>
                                                                    </li>
                                                                )}
                                                            </div>
                                                        )}

                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {currentItems.length === 0 && (
                                        <tr>
                                            <td colSpan={9} style={{ textAlign: 'center' }}>
                                                <Image src={Empty} alt="" width={100} height={100} />
                                                <p className="text-gray-500">No request found</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {currentItems.length > 0 && (
                            <div className="flex justify-center items-center mt-4 md:justify-between">
                                <div className="hidden md:flex items-center">
                                    <p className="text-sm text-gray35 mr-2">Show</p>
                                    <select className="rounded-md p-1.5 text-sm text-primary6 bg-gray8 focus:outline-none"
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPage}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                        <option value={25}>25</option>
                                        <option value={30}>30</option>
                                    </select>
                                    <p className="text-sm text-gray35 ml-2">entries</p>
                                </div>

                                <div className="flex items-center">
                                    <ul className="flex items-center justify-between p-0 m-0 list-none">

                                        <li className={`mr-3 ${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handlePrevBtn}>
                                            <a className="text-blue">
                                                <Image src={PaginationPrev} alt="" />
                                            </a>
                                        </li>


                                        {pages.map((page: number, index: number) => (
                                            <li key={index} className={`px-3 py-1.5 border border-gray35 rounded-[10px] text-sm  hover:bg-blue hover:border-blue hover:text-white transition duration-300 ease-in-out cursor-pointer mr-2 ${currentPage === page ? 'bg-blue border-blue text-white' : 'text-blue'}`}
                                                onClick={() => paginate(page)}
                                            >
                                                <a className="">
                                                    {page}
                                                </a>
                                            </li>
                                        ))}



                                        <li className={`ml-3 ${currentPage === pages[pages.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handleNextBtn} >
                                            <a className="text-blue">
                                                <Image src={PaginationNext} alt="" />
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        )}
                    </div>


                </div>
            )}


            <Drawer
                open={isOpen2}
                onClose={toggleDrawer2}
                size={450}
                direction={isDesktop ? 'right' : 'bottom'}
                style={{
                    overflow: 'scroll',
                    maxHeight: '100vh'
                }}
            >
                <>
                    <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">
                        <h1 className="text-lg font-medium text-gray11">Service Details</h1>
                        <button className="text-gray11" onClick={toggleDrawer2}>
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>

                    {/* service image */}
                    <div className="flex flex-col justify-center items-center p-6">
                        {imagesToDisplay.length > 0 ? (
                            <>
                                {imagesToDisplay.map((image: any, index: number) => (
                                    index === 0 && (
                                        <Image src={image.image} alt="service" width={300} height={200} />
                                    )
                                ))}
                            </>
                        ) : (
                            <Image src={NoImage} width={200} height={200} alt="no-image" />
                        )}
                        <h1 className="text-base font-medium text-gray11 mt-4">{serviceName}</h1>
                    </div>


                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4">

                            <div className="flex flex-col mb-5">
                                <label className="text-xs text-gray25 font-normal mb-4">Price</label>
                                <p className="text-sm text-gray26 font-medium">₦{price}</p>
                            </div>

                            <div className="flex flex-col mb-5">
                                <label className="text-xs text-gray25 font-normal mb-4">Payment Status</label>
                                <p className="text-sm text-gray26 font-medium">{paymentStatus}</p>
                            </div>

                            <div className="flex flex-col mb-5">
                                <label className="text-xs text-gray25 font-normal mb-4">Request Status</label>
                                <p className="text-sm text-gray26 font-medium">{requestStatus}</p>
                            </div>

                            <div className="flex flex-col mb-5">
                                <label className="text-xs text-gray25 font-normal mb-4">Date Requested</label>
                                <p className="text-sm text-gray26 font-medium">{requestDate}</p>
                            </div>

                        </div>
                    </div>


                </>
            </Drawer>
        </>
    )
}

export default Requests