/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Empty, PaginationNext, PaginationPrev, Search2, CloseDraw, NoImage } from '../../../assets'
import { FaEllipsisH } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import { formatAmount, formatDate, shortenText } from '../../../utils/functions'
import { useAppSelector } from '../../../../src/redux/hooks'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Loader from '../loader/Loader'

const Serivce = (props: any) => {
  const { role, merchant_type } = useAppSelector((state) => state.auth)

  const [isMerchantType, setIsMerchantType] = React.useState('' as any)
  const [isRole, setIsRole] = React.useState('' as any)

  React.useEffect(() => {
    setIsMerchantType(merchant_type)
    setIsRole(role)
  }, [merchant_type, role])

  const [orderForMerchant, setOrderForMerchant] = React.useState(false)
  const [orderForUser, setOrderForUser] = React.useState(true)
  const [singleOrder, setSingleOrder] = React.useState({} as any)
  const [orderID, setOrderID] = React.useState(0)
  const [accept, setAccept] = React.useState(false)
  const [reject, setReject] = React.useState(false)
  let [dropdown, setDropdown] = React.useState(false)
  const [itemsPerPageUser, setItemsPerPageUser] = React.useState(5);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [images, setImages] = React.useState([] as any)
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [deliveryCharge, setDeliveryCharge] = React.useState('')
  const [deliveryDate, setDeliveryDate] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [deliveryAddress, setDeliveryAddress] = React.useState('')
  const [state, setState] = React.useState('')
  const [lga, setLga] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [paymentStatus, setPaymentStatus] = React.useState('')

  React.useEffect(() => {
    if (singleOrder && singleOrder.product) {
      setOrderID(singleOrder.orderID)
      setImages(singleOrder.product.product.images)
      setName(singleOrder.product.product.name)
      setPrice(singleOrder.price)
      setQuantity(singleOrder.quantityPurchased)
      setDeliveryCharge(singleOrder.deliveryCharge)
      setDeliveryDate(singleOrder.expectedDeliveryDate)
      setStatus(singleOrder.status)
      setDeliveryAddress(singleOrder.deliveryAddress)
      setState(singleOrder.state.stateName)
      setLga(singleOrder.lga.lgaName)
      setPhone(singleOrder.phone)
      setPaymentStatus(singleOrder.paymentStatus)
    }
  }, [singleOrder])

  const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsDesktop])

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
    setDropdown(false)
  }


  const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchOrder, search, handleFilterOrderByDays, days } = useSearchAndPagination(props.orders, itemsPerPage);

  const { currentItems: currentItemsUser, currentPage: currentPageUser, pages: pagesUser, paginate: paginateUser, handleNextBtn: handleNextBtnUser, handlePrevBtn: handlePrevBtnUser, handleSearchOrder: handleSearchOrderUser, search: searchUser, handleFilterOrderByDays: handleFilterOrderByDaysUser, days: daysUser } = useSearchAndPagination(props.ordersForMe, itemsPerPage);

  const handleItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  }

  const handleItemsPerPageUser = (e: any) => {
    setItemsPerPageUser(e.target.value);
  }

  const handleDropdown = (id: any, order: any) => {
    if (dropdown === false) {
      setDropdown(id)
      setSingleOrder(order)
    }
    else if (dropdown === id) {
      setDropdown(false)
    }
    else {
      setDropdown(id)
      setSingleOrder(order)
    }
  }

  React.useEffect(() => {
    if (props.success) {
      setDropdown(false)
    }
  }, [props.success])

  // accept order
  const handleAcceptOrder = (data: any) => {
    props.acceptOrder({
      orderID: orderID,
    })
  }

  // reject order
  const handleRejectOrder = (data: any) => {
    props.rejectOrder({
      orderID: orderID,
    })
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

  const tableHead = [
    'No',
    'Product',
    'Price',
    'Quantity',
    'Delivery Charge',
    'Delivery Date',
    'Status',
    'Action'
  ]


  return (
    <>
      {props.loadingFetchOrders ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1">

          <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mb-5 w-full">
            <div className="flex items-center w-full">
              <div className="flex items-center relative w-full">
                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search order"
                  value={
                    orderForMerchant ? search : searchUser
                  }
                  onChange={
                    orderForMerchant ? handleSearchOrder : handleSearchOrderUser
                  }
                />
                <div className="absolute top-2 left-3">
                  <Image src={Search2} alt="search" />
                </div>
              </div>
            </div>

            <div className="flex items-end gap-0 w-full md:w-1/2">
              {isRole === 'merchant' && isMerchantType === 'business' && (
                <>
                  <button className={`w-full ${orderForUser ? "bg-primary6 text-base text-white font-medium" : "bg-white text-gray11"} font-medium px-4 py-1 rounded-tr-none rounded-br-none rounded-tl-md rounded-bl-md`}
                    onClick={() => {
                      setOrderForUser(true)
                      setOrderForMerchant(false)
                      setDropdown(false)
                      setSingleOrder({})
                    }}

                  >For Me</button>
                  <button className={`w-full ${orderForMerchant ? "bg-primary6 text-base text-white font-medium" : "bg-white text-gray11"} font-medium px-4 py-1 rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none"`}
                    onClick={() => {
                      setOrderForMerchant(true)
                      setOrderForUser(false)
                      setDropdown(false)
                      setSingleOrder({})
                    }}
                  >For Merchant</button>
                </>
              )}
            </div>
          </div>

          <>
            {orderForMerchant && (
              <div className="card">
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-full max-w-full">
                      <h3 className="font-medium text-xl text-black-100">
                        Orders
                      </h3>
                    </div>
                    <div className="w-full max-w-full text-right">
                      <select className="bg-white rounded-[10px] border-2 border-primary6 text-primary6 text-sm font-medium py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white"
                        onChange={handleFilterOrderByDays}
                        value={days}
                      >
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                      </select>
                    </div>
                  </div>
                </div>
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
                        {tableHead.map((head: any, index: any) => (
                          <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 && currentItems.map((order: any, index: number) => (
                        <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            <input type="checkbox" className="w-3 h-3" />
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {index + 1}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left" title={order.product.product.name}>
                            {shortenText(order.product.product.name, 12)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            ₦{formatAmount(order.price)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {order.quantityPurchased}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            ₦{formatAmount(order.deliveryCharge)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {formatDate(order.expectedDeliveryDate)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {order.status === 'Pending' && (
                              <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}

                            {order.status === 'Accepted' && (
                              <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}

                            {order.status === 'Rejected' && (
                              <span className="text-xs font-light text-white bg-red px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}
                          </td>
                          <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                              handleDropdown(order.orderID, order)
                            }} />

                            <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                              display: dropdown === order.orderID ? 'block' : 'none'
                            }}>
                              <ul>

                                <li>
                                  <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                    onClick={() => { toggleDrawer() }}
                                  >
                                    View
                                  </div>
                                </li>

                                {isRole === 'merchant' && isMerchantType === 'business' && (
                                  <>
                                    {props.loading && accept ? (
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
                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                          onClick={
                                            () => {
                                              setAccept(true)
                                              setReject(false)
                                              handleAcceptOrder(order.orderID)
                                            }
                                          }
                                        >
                                          Accept Order
                                        </div>
                                      </li>
                                    )}

                                    {props.loading && reject ? (
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
                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                          onClick={
                                            () => {
                                              setReject(true)
                                              setAccept(false)
                                              handleRejectOrder(order.orderID)
                                            }
                                          }
                                        >
                                          Reject Order
                                        </div>
                                      </li>
                                    )}
                                  </>
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
                            <p className="text-gray-500">
                              No order found
                            </p>
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
            )}

            {orderForUser && (
              <div className="card">
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-full max-w-full">
                      <h3 className="font-medium text-xl text-black-100">
                        Orders
                      </h3>
                    </div>
                    <div className="w-full max-w-full text-right">
                      <select className="bg-white rounded-[10px] border-2 border-primary6 text-primary6 text-sm font-medium py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white"
                        onChange={handleFilterOrderByDaysUser}
                        value={daysUser}
                      >
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                      </select>
                    </div>
                  </div>
                </div>
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
                        {tableHead.map((head: any, index: any) => (
                          <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsUser.length > 0 && currentItemsUser.map((order: any, index: number) => (
                        <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            <input type="checkbox" className="w-3 h-3" />
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {index + 1}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left" title={order.product.product.name}>
                            {shortenText(order.product.product.name, 12)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            ₦{formatAmount(order.price)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {order.quantityPurchased}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            ₦{order.deliveryCharge}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {formatDate(order.expectedDeliveryDate)}
                          </td>
                          <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                            {order.status === 'Pending' && (
                              <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}

                            {order.status === 'Accepted' && (
                              <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}

                            {order.status === 'Rejected' && (
                              <span className="text-xs font-light text-white bg-red px-4 py-1 rounded-[10px] opacity-80">{order.status}</span>
                            )}
                          </td>
                          <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                              handleDropdown(order.orderID, order)
                            }} />

                            <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                              display: dropdown === order.orderID ? 'block' : 'none'
                            }}>
                              <ul>

                                <li>
                                  <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                    onClick={
                                      () => {
                                        toggleDrawer()
                                      }
                                    }
                                  >
                                    View
                                  </div>
                                </li>

                                {isRole === 'merchant' && isMerchantType === 'business' && (
                                  <>
                                    {props.loading && accept ? (
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
                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                          onClick={
                                            () => {
                                              setAccept(true)
                                              setReject(false)
                                              handleAcceptOrder(order.orderID)
                                            }
                                          }
                                        >
                                          Accept Order
                                        </div>
                                      </li>
                                    )}

                                    {props.loading && reject ? (
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
                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer"
                                          onClick={
                                            () => {
                                              setReject(true)
                                              setAccept(false)
                                              handleRejectOrder(order.orderID)
                                            }
                                          }
                                        >
                                          Reject Order
                                        </div>
                                      </li>
                                    )}
                                  </>
                                )}


                              </ul>
                            </div>

                          </td>
                        </tr>
                      ))}

                      {currentItemsUser.length === 0 && (
                        <tr>
                          <td colSpan={9} style={{ textAlign: 'center' }}>
                            <Image src={Empty} alt="" width={100} height={100} />
                            <p className="text-gray-500">No order found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {currentItemsUser.length > 0 && (
                  <div className="flex justify-center items-center mt-4 md:justify-between">
                    <div className="hidden md:flex items-center">
                      <p className="text-sm text-gray35 mr-2">Show</p>
                      <select className="rounded-md p-1.5 text-sm text-primary6 bg-gray8 focus:outline-none"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageUser}
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

                        <li className={`mr-3 ${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handlePrevBtnUser}>
                          <a className="text-blue">
                            <Image src={PaginationPrev} alt="" />
                          </a>
                        </li>


                        {pagesUser.map((page: number, index: number) => (
                          <li key={index} className={`px-3 py-1.5 border border-gray35 rounded-[10px] text-sm  hover:bg-blue hover:border-blue hover:text-white transition duration-300 ease-in-out cursor-pointer mr-2 ${currentPageUser === page ? 'bg-blue border-blue text-white' : 'text-blue'}`}
                            onClick={() => paginateUser(page)}
                          >
                            <a className="">
                              {page}
                            </a>
                          </li>
                        ))}



                        <li className={`ml-3 ${currentPageUser === pagesUser[pagesUser.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : 'cursor-pointer'}`} onClick={handleNextBtnUser} >
                          <a className="text-blue">
                            <Image src={PaginationNext} alt="" />
                          </a>
                        </li>

                      </ul>
                    </div>

                  </div>
                )}
              </div>
            )}
          </>

        </div>
      )}


      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        size={450}
        direction={isDesktop ? 'right' : 'bottom'}
        style={{
          overflow: 'scroll',
          maxHeight: '100vh'
        }}
      >
        <>
          <div className="flex justify-between items-center border-b-2 border-gray px-6 py-5">
            <h1 className="text-lg font-medium text-gray39">Order Details</h1>
            <button className="text-gray11" onClick={toggleDrawer}>
              <Image src={CloseDraw} alt="" />
            </button>
          </div>

          {/* prduct image */}
          <div className="flex flex-col justify-center items-center p-6">
            {images.length > 0 ? (
              <>
                {images && images.map((image: any, index: number) => (
                  index === 0 && (
                    <Image src={image.image} alt="product"
                      width={200}
                      height={200}
                    />
                  )
                ))}
              </>
            ) : (
              <Image src={NoImage} alt="no-image" />
            )}
            <h1 className="text-base font-medium text-gray11 text-center mt-4">{name}</h1>
          </div>



          {/* order details */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Price</label>
                <p className="text-sm text-gray26 font-medium">₦{formatAmount(price)}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Quantity</label>
                <p className="text-sm text-gray26 font-medium">{quantity}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Delivery Charge</label>
                <p className="text-sm text-gray26 font-medium">₦{formatAmount(deliveryCharge)}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Delivery Date</label>
                <p className="text-sm text-gray26 font-medium">₦{formatDate(deliveryDate)}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Status</label>
                <p className="text-sm text-gray26 font-medium">{status}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">Payment Status</label>
                <p className="text-sm text-gray26 font-medium">{paymentStatus}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">State</label>
                <p className="text-sm text-gray26 font-medium">{state}</p>
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-xs text-gray25 font-normal mb-4">LGA</label>
                <p className="text-sm text-gray26 font-medium">{lga}</p>
              </div>



            </div>
          </div>

          <hr className="border-gray15 border-1" />

          {/* addrress */}
          <div className="p-6">
            <div className="flex flex-col mb-5">
              <label className="text-[13px] text-gray25 font-normal mb-4">Delivery Address</label>
              <p className="text-base text-gray26 font-medium">
                {deliveryAddress}
              </p>
            </div>
          </div>

        </>
      </Drawer>
    </>
  )
}

export default Serivce