import React from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import { formatAmount, formatDate, shortenText } from '../../../utils/functions'
import { Empty, PaginationNext, PaginationPrev } from '../../../assets'
import Image from 'next/image'
import { useAppSelector } from '../../../redux/hooks'


const Table = ({ orders, acceptOrder, rejectOrder, loading }: { orders: any, acceptOrder: any, rejectOrder: any, loading: any }) => {

  const [accept, setAccept] = React.useState(false)
  const [reject, setReject] = React.useState(false)
  const [orderID, setOrderID] = React.useState(0)
  const [singleOrder, setSingleOrder] = React.useState({} as any)
  const [isMerchantType, setIsMerchantType] = React.useState('' as any)
  const [isRole, setIsRole] = React.useState('' as any)

  const { role, merchant_type } = useAppSelector((state) => state.auth)


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

  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleFilterOrderByDays, days } = useSearchAndPagination(orders, itemsPerPage);

  const handleItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  }

  React. useEffect(() => {
    setIsMerchantType(merchant_type)
    setIsRole(role)
  }, [merchant_type, role])

  React.useEffect(() => {
    if (singleOrder && singleOrder.product) {
      setOrderID(singleOrder.orderID)
    }
  }, [singleOrder])

  let [dropdown, setDropdown] = React.useState(false)
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

  const handleAcceptOrder = (data: any) => {
    acceptOrder({
      orderID: orderID,
    })
  }

  // reject order
  const handleRejectOrder = (data: any) => {
    rejectOrder({
      orderID: orderID,
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
  ]

  return (
    <>
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
                <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left">
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

                {isRole === 'merchant' && isMerchantType === 'business' && (
                  <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left">
                    Action
                  </th>
                )}
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
                  <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
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
                  {isRole === 'merchant' && isMerchantType === 'business' && (
                    <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                      <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                        handleDropdown(order.orderID, order)
                      }} />

                      <div className="absolute right-[22.5%] mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                        display: dropdown === order.orderID ? 'block' : 'none'
                      }}>
                        <ul>

                          {isRole === 'merchant' && isMerchantType === 'business' && (
                            <>
                              {loading && accept ? (
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


                              {loading && reject ? (
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
                  )}
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
    </>
  )
}

export default Table