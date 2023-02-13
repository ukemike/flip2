import React from 'react';
import { } from 'react-icons/fa';
import { usePaystackPayment } from 'react-paystack';
import { useSearchAndPagination } from '../../../services/paginationHook';
import { Empty, PaginationNext, PaginationPrev, Escrow, Main, CloseDraw } from '../../../assets';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useAppSelector } from '../../../redux/hooks'
import { formatAmount, formatDate } from '../../../utils/functions';
import Loader from '../loader/Loader';

const Wallet = (props: any) => {

    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleFilterTransactionByDays, days } = useSearchAndPagination(props.transactions, itemsPerPage);

    const { email } = useAppSelector((state) => state.auth)
    const [amount, setAmount] = useState(0);
    const [formError, setFormError] = useState(false)
    const [isWithdrawal, setIsWithdrawal] = useState(false)


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

    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const clearForm = () => {
        setAmount(0)
        setFormError(false)
        setIsWithdrawal(false)
    }

    React.useEffect(() => {
        if (isOpen === false) {
            clearForm()
        }
    }, [isOpen])

    React.useEffect(() => {
        if (props.success && isOpen) {
            toggleDrawer()
        }
    }, [props.success, isOpen])

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: amount * 100,
        publicKey: 'pk_test_8c854743085abebb6e7948dbeb4668625d57a9aa',
    };

    const onSuccess: any = (reference: any) => {
        if (reference) {
            props.topUpWallet({
                amount,
                payment_reference: reference.reference
            })
        }
    }

    const onClose = () => {
        toggleDrawer()
    }

    const initializePayment = usePaystackPayment(config as any);

    let withdrawableBalance = props.walletBalance.withdrawableBalance

    const handleWithdrawal = (e: any) => {
        e.preventDefault()
        if (!amount) {
            setFormError(true)
        }
        else if (amount > withdrawableBalance) {
            setFormError(true)
        } else {
            props.requestWithdrawal({
                amount
            })
        }
    }

    let [dropdown, setDropdown] = React.useState(false)
    const handleDropdown = (id: any) => {
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
        'Purpose',
        'Date',
        'Status',
        // 'Action'
    ]

    return (
        <>
            {props.loadingFetchWalletBalance || props.loadingFetchTransactions ? (
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                        {/* escrow balance */}
                        <div className="card rounded-[12px]">
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    <h3 className="text-[32px] font-semibold text-black-100 mb-1">₦{formatAmount(props.walletBalance.escrowBalance)}</h3>
                                    <h5 className="text-xl font-light text-gray39">Escrow Balance</h5>
                                </div>

                                <div className='w-20 h-20'>
                                    <Image src={Escrow} alt="" />
                                </div>
                            </div>
                        </div>

                        {/* main balance */}
                        <div className="card rounded-[12px]">
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    <h3 className="text-[32px] font-semibold text-black-100 mb-1">₦{formatAmount(props.walletBalance.withdrawableBalance)}</h3>
                                    <h5 className="text-xl font-light text-gray39">Main Balance</h5>
                                </div>

                                <div className='w-20 h-20'>
                                    <Image src={Main} alt="" />
                                </div>
                            </div>
                        </div>

                        {/* top up and withdraw card */}
                        <div className="card hidden">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="font-bold uppercase text-gray11">Top Up</h5>
                                    <button className="bg-primary text-white px-4 py-2 rounded-xl mt-2"
                                        onClick={() => {
                                            toggleDrawer()
                                        }}
                                    >
                                        Deposit
                                    </button>
                                </div>

                                <div>
                                    <h5 className="font-bold uppercase text-gray11">Withdraw</h5>
                                    <button className="bg-primary text-white px-4 py-2 rounded-xl mt-2"
                                        onClick={() => {
                                            toggleDrawer()
                                            setIsWithdrawal(true)
                                        }}
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex flex-col gap-3">
                                <div className='bg-gray23 py-1 px-3 flex items-center justify-between rounded-[14px]'>
                                    <h5 className="text-base font-medium text-gray39">Top Up</h5>
                                    <button className="filled-btn w-32"
                                        onClick={() => toggleDrawer()}>
                                        Deposit
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                                <div className='bg-gray23 py-1 px-3 flex items-center justify-between rounded-[14px]'>
                                    <h5 className="text-base font-medium text-gray39">Withdraw</h5>
                                    <button className="filled-btn w-32"
                                        onClick={() => { toggleDrawer(); setIsWithdrawal(true) }}>
                                        Withdraw
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <br />

                    <div className="card">

                        <div className="mb-2">
                            <div className="flex items-center">
                                <div className="w-full max-w-full">
                                    <h3 className="font-medium text-xl text-black-100">
                                        Transactions
                                    </h3>
                                </div>
                                <div className="w-full max-w-full text-right">
                                    <select className="bg-white rounded-[10px] border-2 border-primary6 text-primary6 text-sm font-medium py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white"
                                        onChange={handleFilterTransactionByDays}
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
                                                {transaction.purpose}
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
                                            {/* <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                                                    handleDropdown(transaction.transID)
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
                                            </td> */}
                                        </tr>
                                    ))}


                                    {currentItems.length === 0 && (
                                        <tr>
                                            <td colSpan={9} style={{ textAlign: 'center' }}>
                                                <Image src={Empty} alt="" width={100} height={100}/>
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
                </>
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
                        {isWithdrawal ? (
                            <h1 className="text-lg font-medium text-gray39">Withdraw Funds</h1>

                        ) : (
                            <h1 className="text-lg font-medium text-gray39">Top Up Account</h1>
                        )}

                        <button className="text-gray11" onClick={toggleDrawer}>
                            <Image src={CloseDraw} alt="" />
                        </button>
                    </div>

                    <div className="px-6 py-5">
                        <>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">Amount<span className="text-red">*</span></label>
                                <input type="number" className="rounded-[10px] p-2 text-sm text-gray11 font-light bg-white border-[0.8px] border-gray20 h-12 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent"
                                    value={amount}
                                    onChange={(e: any) => setAmount(e.target.value)}
                                />
                                {formError && !amount && (<p className="text-red font-light text-sm mt-1">Amount is required</p>)}
                                {isWithdrawal && formError && amount > withdrawableBalance && (<p className="text-red font-light text-sm mt-1">
                                    Insufficient balance
                                </p>)}
                            </div>


                            {isWithdrawal ? (
                                <div className="flex justify-start">
                                    {props.loading ? (


                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Processing...
                                        </button>
                                    ) : (

                                        <button type='button' className="filled-btn md:w-full" onClick={handleWithdrawal}>
                                            Withdraw
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    )}
                                </div>
                            ) : (

                                <div className="flex justify-start">
                                    {props.loading ? (
                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Processing...
                                        </button>
                                    ) : (
                                        <button type='button' className="filled-btn md:w-full"
                                            onClick={
                                                () => {
                                                    if (!amount) {
                                                        setFormError(true)
                                                    } else {
                                                        setFormError(false)
                                                        initializePayment(onSuccess, onClose)
                                                    }
                                                }
                                            }
                                        >Top Up
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    )}
                                </div>
                            )}


                        </>
                    </div>

                </>
            </Drawer>
        </>
    )
}

export default Wallet