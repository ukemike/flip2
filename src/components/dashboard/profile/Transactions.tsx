import React from 'react'
import Image from 'next/image'
import { Empty, PaginationNext, PaginationPrev } from '../../../assets'
import { FaEllipsisH } from 'react-icons/fa'
import { useSearchAndPagination } from '../../../services/paginationHook'
import { formatAmount, formatDate } from '../../../utils/functions'

const Transactions = (props: any) => {

    const [itemsPerPage, setItemsPerPage] = React.useState(10);

    // table action state
    let [dropdown, setDropdown] = React.useState(false)

    const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearch, search } = useSearchAndPagination(props.transactions, itemsPerPage);

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

    const handleDropdown = (id: any, transaction: any) => {
        if (dropdown === false) {
            setDropdown(id)
        }
        else if (dropdown === id) {
            setDropdown(false)
        }
        else {
            setDropdown(id)
        }
    }

    const tableHead = [
        'No',
        'Amount Paid',
        'Payment Type',
        'Date',
        'Status',
        'Action'
    ]

    return (
        <>
            <div className='p-4'>
                <div className='flex flex-col gap-4 w-full'>

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

                                    {tableHead.map((head: any, index: number) => (
                                        <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                                            {head}
                                        </th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 && currentItems.map((transaction: any, index: number) => (
                                    <tr className={`hover:bg-gray10 ${index % 2 === 0 ? 'bg-gray10' : ''} `} key={index}>
                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            <input type="checkbox" className="w-3 h-3" />
                                        </td>
                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            {transaction.serial}
                                        </td>
                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            ₦ {formatAmount(transaction.amount)}
                                        </td>
                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            {formatDate(transaction.transDate)}
                                        </td>

                                        <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                            {transaction.status === 'failed' && (
                                                <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{transaction.status}</span>
                                            )}

                                            {transaction.status === 'successfull' && (
                                                <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{transaction.status}</span>
                                            )}
                                        </td>
                                        <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                                                handleDropdown(transaction.transID, transaction)
                                            }} />

                                            <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-xl" style={{
                                                display: dropdown === transaction.transID ? 'block' : 'none'
                                            }}>
                                                <ul>
                                                    <li>
                                                        <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white cursor-pointer">
                                                            View
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}


                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center' }}>
                                            <Image src={Empty} alt="" 
                                                width={100}
                                                height={100}
                                            />
                                            <p className="text-gray22 text-base font-medium">No transactions found</p>
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
        </>
    )
}

export default Transactions