import React from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaList, FaEllipsisV, FaEllipsisH, FaTimes } from 'react-icons/fa'
import { Empty, Search2, PaginationNext, PaginationPrev, CloseDraw } from '../../../assets'
import Image from 'next/image'
import { useSearchAndPagination } from '../../../services/paginationHook'
import { shortenText, getPostedDate, formatDate, formatAmount } from '../../../utils/functions'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useState, useEffect } from 'react'
import Loader from '../loader/Loader'


const Proposal = ({ proposals, success, loading, loadingFetctProposals, withdrawProposal, updateProposal }: { proposals: any, success: any, loading: any, loadingFetctProposals: any, withdrawProposal: any, updateProposal: any }) => {

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

    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchProposal, search, filterProposalsByDays, days } = useSearchAndPagination(proposals, itemsPerPage);

    const handleItemsPerPage = (e: any) => {
        setItemsPerPage(e.target.value);
    }



    let [dropdown, setDropdown] = React.useState(false)
    const [singleProposal, setSingleProposal] = React.useState<any>({} as any)
    const [payment_option, setPaymentOption] = useState('')
    const [expected_duration, setExpectedDuration] = useState('')
    const [cover_letter, setCoverLetter] = useState('')
    const [total_price, setTotalPrice] = useState('')
    const [milestones, setMilestones] = useState([] as any)
    const [formError, setFormError] = useState(false)

    const handleDropdown = (id: any, proposal: any) => {
        if (dropdown === false) {
            setDropdown(id)
            setSingleProposal(proposal)
        }
        else if (dropdown === id) {
            setDropdown(false)
        }
        else {
            setDropdown(id)
            setSingleProposal(proposal)
        }
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
        setDropdown(false)
    }

    const [isOpen2, setIsOpen2] = React.useState(false)
    const toggleDrawer2 = () => {
        setIsOpen2((prevState) => !prevState)
        setDropdown(false)
    }

    React.useEffect(() => {
        if (isOpen2 === false) {
            clearForm()
        }
    }, [isOpen2])

    React.useEffect(() => {
        if (success && isOpen2) {
            toggleDrawer2()
        }
        if (success && dropdown) {
            setDropdown(false)
        }
    }, [success, isOpen2, dropdown])


    const [milestoneValue, setMilestoneValue] = useState([{ description: '', due_date: '', amount: '' }] as any)

    const handleMilestoneChange = (e: any, index: any) => {
        let newMilestoneValue = [...milestoneValue]
        newMilestoneValue[index][e.target.name] = e.target.value || ''
        setMilestoneValue(newMilestoneValue)
    }

    const handleMilestoneAdd = () => {
        setMilestoneValue([...milestoneValue, { description: '', due_date: '', amount: '' }])
    }

    const handleMilestoneRemove = (index: any) => {
        let newMilestoneValue = [...milestoneValue]
        newMilestoneValue.splice(index, 1)
        setMilestoneValue(newMilestoneValue)
    }

    const handleMilestoneSubmit = (e: any) => {
        e.preventDefault()
        setMilestones(milestoneValue)
    }

    const handleWithdrawProposal = (id: any) => {
        withdrawProposal(id)
    }

    useEffect(() => {
        if (singleProposal) {
            setPaymentOption(singleProposal.paymentOption)
            setExpectedDuration(singleProposal.expectedDuration)
            setCoverLetter(singleProposal.coverLetter)
            setTotalPrice(singleProposal.total_price)
            setMilestones(singleProposal.milestones)
            setMilestoneValue(
                singleProposal.milestones && singleProposal.milestones.map((milestone: any) => {
                    return {
                        description: milestone.description,
                        due_date: milestone.dueDate,
                        amount: milestone.amount
                    }
                })
            )
        }
    }, [singleProposal])

    const handleProposalUpdate = (e: any) => {
        e.preventDefault()
        handleMilestoneSubmit(e)
        if (!payment_option) {
            setFormError(true)
            return
        } if (payment_option === 'by_milestone' && milestones.length === 0) {
            setFormError(true)
            return
        } if (payment_option === 'by_project' && total_price === '') {
            setFormError(true)
            return
        } else {
            setFormError(false)
            if (payment_option === 'by_milestone') {
                const data = {
                    payment_option,
                    expected_duration,
                    cover_letter,
                    milestones: milestoneValue,
                    proposalID: singleProposal.proposalID
                }
                updateProposal(data)
            } else {
                const data = {
                    payment_option,
                    expected_duration,
                    cover_letter,
                    total_price,
                    proposalID: singleProposal.proposalID
                }
                updateProposal(data)
            }
        }
    }


    const clearForm = () => {
        setPaymentOption('')
        setExpectedDuration('')
        setCoverLetter('')
        setTotalPrice('')
        setMilestones([])
        setMilestoneValue([{ description: '', due_date: '', amount: '' }])
        setFormError(false)
    }

    const tableHead = [
        'Payment Option',
        'Price',
        'Amount To Receive',
        'Duration',
        'Payment Status',
        'Submission Date',
        'Status',
        'Action'
    ]


    return (
        <>
            {loadingFetctProposals ? (
                <Loader />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-5">

                        <div className="flex items-center w-full">
                            <div className="flex items-center relative w-full">
                                <input type="text" className=" w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search proposal"
                                    value={search}
                                    onChange={handleSearchProposal}
                                />
                                <div className="absolute top-2 left-3">
                                    <Image src={Search2} alt="search" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="card">
                        <div className="mb-2">
                            <div className="flex items-center">
                                <div className="w-full max-w-full">
                                    <h3 className="font-medium text-xl text-black-100">
                                        Proposals
                                    </h3>
                                </div>
                                <div className="w-full max-w-full text-right">
                                    <select className="bg-white rounded-[10px] border-2 border-primary6 text-primary6 text-sm font-medium py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white"
                                        onChange={filterProposalsByDays}
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
                                        {tableHead.map((head: any, index: number) => (
                                            <th className="px-2 text-gray33 align-middle border-b border-solid border-gray5 py-3 text-xs font-medium whitespace-nowrap text-left" key={index}>
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>

                                    {currentItems.length > 0 && currentItems.map((proposal: any, index: number) => (
                                        <tr className="hover:bg-gray cursor-pointer" key={index}>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                <input type="checkbox" className="w-3 h-3" />
                                            </td>
                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {proposal.paymentOption === 'by_milestone' ? 'By Milestone' : 'By Project'}
                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                ₦{formatAmount(proposal.total_price)}
                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                ₦{formatAmount(proposal.amountToReceive)}
                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {proposal.expectedDuration}
                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {proposal.paymentStatus === 'Pending' && (
                                                    <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{proposal.paymentStatus}</span>
                                                )}

                                                {proposal.paymentStatus === 'Review' && (
                                                    <span className="text-xs font-light text-white bg-primary6 px-4 py-1 rounded-[10px] opacity-80">{proposal.paymentStatus}</span>
                                                )}

                                                {proposal.paymentStatus === 'Accepted' && (
                                                    <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{proposal.paymentStatus}</span>
                                                )}

                                                {proposal.paymentStatus === 'Rejected' && (
                                                    <span className="text-xs font-light text-white bg-red px-4 py-1 rounded-[10px] opacity-80">{proposal.paymentStatus}</span>
                                                )}

                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {formatDate(proposal.submissionDate)}
                                            </td>

                                            <td className="border-b border-gray5 align-middle font-light text-xs text-black-100 whitespace-nowrap px-2 py-4 text-left">
                                                {proposal.status === 'Pending' && (
                                                    <span className="text-xs font-light text-white bg-yellow px-4 py-1 rounded-[10px] opacity-80">{proposal.status}</span>
                                                )}

                                                {proposal.status === 'Review' && (
                                                    <span className="text-xs font-light text-white bg-primary6 px-4 py-1 rounded-[10px] opacity-80">{proposal.status}</span>
                                                )}

                                                {proposal.status === 'Accepted' && (
                                                    <span className="text-xs font-light text-white bg-green4 px-4 py-1 rounded-[10px] opacity-80">{proposal.status}</span>
                                                )}

                                                {proposal.status === 'Rejected' && (
                                                    <span className="text-xs font-light text-white bg-red px-4 py-1 rounded-[10px] opacity-80">{proposal.status}</span>
                                                )}
                                            </td>

                                            <td className=" border-b border-gray5 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <FaEllipsisH className="cursor-pointer text-primary6" onClick={() => {
                                                    handleDropdown(proposal.proposalID, proposal)
                                                }} />

                                                <div className="absolute right-12 mt-2 py-2 w-48 bg-white rounded-md shadow-2xl z-[999]" style={{
                                                    display: dropdown === proposal.proposalID ? 'block' : 'none'
                                                }}>
                                                    <ul>

                                                        <li>
                                                            <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white"
                                                                onClick={() => {
                                                                    toggleDrawer()
                                                                }}
                                                            >
                                                                View
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white"
                                                                onClick={() => {
                                                                    toggleDrawer2()
                                                                }}
                                                            >Edit</div>
                                                        </li>

                                                        {loading ? (
                                                            <li>
                                                                <div className="px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white flex items-center gap-1">
                                                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                                    </svg>
                                                                    Withdrawing...
                                                                </div>
                                                            </li>
                                                        ) : (
                                                            <li>
                                                                <div className="block px-4 py-2 text-sm text-gray11 font-medium hover:bg-primary6 hover:text-white" onClick={() => { handleWithdrawProposal(proposal.proposalID) }}>Withdraw</div>
                                                            </li>
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
                                                <p className="text-gray11 font-medium text-sm">
                                                    No Proposals Found
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
            )}


            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                size={400}
                direction={isDesktop ? 'right' : 'bottom'}
                style={{
                    overflow: 'scroll',
                    maxHeight: '100vh'
                }}
            >
                <>
                    <div className="flex justify-between items-center border-b-2 border-gray px-4 py-5">

                        <h1 className="text-lg font-medium text-gray11">Proposal Details</h1>

                        <button className="text-gray11" onClick={toggleDrawer}>
                            <Image src={CloseDraw} alt="" />
                        </button>
                    </div>

                    <div className="px-4 py-5">
                        <div className="flex flex-col">
                            <div className="flex flex-col border border-gray28 rounded-xl">

                                <div className="p-3">
                                    <div className="flex mb-4">
                                        <h1 className="text-xl font-semibold text-gray33">
                                            {singleProposal.paymentOption === 'by_milestone' ? 'By Milestone' : 'By Project'}
                                        </h1>
                                    </div>


                                    <div className="flex gap-2 mt-2">
                                        <span className="text-sm font-light text-gray33 mr-1">{getPostedDate(singleProposal.submissionDate)}</span>
                                    </div>


                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">

                                    <div className="flex flex-col gap-2 mt-2">
                                        <span className="text-sm font-medium text-gray33 mr-1">Cover Letter:</span>
                                        <span className="text-sm font-light text-gray33 mr-1">{singleProposal.coverLetter}</span>
                                    </div>

                                </div>

                                <hr className="border-gray28" />


                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Payment Status:</span>
                                            <span className="text-sm font-medium text-gray33">{singleProposal.paymentStatus}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Status:</span>
                                            <span className="text-sm font-medium text-gray33">{singleProposal.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Total Price:</span>
                                            <span className="text-sm font-medium text-gray33">{singleProposal.total_price}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Milestones:</span>
                                            <span className="text-sm font-medium text-gray33">{singleProposal.numOfMilestones}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Amount To Receive:</span>
                                            <span className="text-sm font-medium text-gray33">
                                                {singleProposal.amountToReceive}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Expected Duration:</span>
                                            <span className="text-sm font-medium text-gray33">
                                                {singleProposal.expectedDuration}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />


                                {singleProposal.reviewComment && (
                                    <>
                                        <div className="p-3">

                                            <div className="flex flex-col gap-2 mt-2">
                                                <span className="text-sm font-medium text-gray33 mr-1">Review Comment:</span>
                                                <span className="text-sm font-light text-gray33 mr-1">{singleProposal.reviewComment}</span>
                                            </div>

                                        </div>
                                        <hr className="border-gray28" />
                                    </>
                                )}


                                {singleProposal.rejectionReason && (
                                    <>
                                        <div className="p-3">

                                            <div className="flex flex-col gap-2 mt-2">
                                                <span className="text-sm font-medium text-gray33 mr-1">Rejection Reason:</span>
                                                <span className="text-sm font-light text-gray33 mr-1">{singleProposal.rejectionReason}</span>
                                            </div>

                                        </div>
                                        <hr className="border-gray28" />
                                    </>
                                )}

                                {singleProposal.paymentOption === 'by_milestone' && (
                                    <>
                                        <div className="p-3">
                                            <div className="flex flex-col gap-2 mt-2">
                                                <span className="text-sm font-medium text-gray33 mr-1">Milestones:</span>
                                                <div className="flex flex-col gap-2">
                                                    {singleProposal.milestones.map((milestone: any, index: number) => (
                                                        <>
                                                            <div key={index} className="flex flex-col gap-2">
                                                                <div>
                                                                    <span className="text-sm font-light text-gray11 mr-1">Description:</span>
                                                                    <span className="text-sm font-medium text-gray11 mr-1">{milestone.description}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-sm font-light text-gray11 mr-1">Amount:</span>
                                                                    <span className="text-sm font-medium text-gray11 mr-1">{milestone.amount}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-sm font-light text-gray11 mr-1">Due Date:</span>
                                                                    <span className="text-sm font-medium text-gray11 mr-1">{milestone.dueDate}</span>
                                                                </div>

                                                            </div>

                                                            <hr className="border-gray28" />
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* date posted */}
                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-sm font-light text-gray33 mr-1">Date posted:</span>
                                        <span className="text-sm font-medium text-gray33">
                                            {formatDate(singleProposal.submissionDate)}
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>


                    </div>

                </>
            </Drawer>

            <Drawer
                open={isOpen2}
                onClose={toggleDrawer2}
                size={400}
                direction={isDesktop ? 'right' : 'bottom'}
                style={{
                    overflow: 'scroll',
                    maxHeight: '100vh'
                }}
            >
                <>
                    <div className="flex justify-between items-center border-b-2 border-gray px-4 py-5">

                        <h1 className="text-lg font-medium text-gray39">Update Proposal</h1>

                        <button className="text-gray11" onClick={toggleDrawer2}>
                            <Image src={CloseDraw} alt="" />
                        </button>
                    </div>

                    <div className="px-4 py-5">

                        <div className="flex flex-col border border-gray28 rounded-xl mb-6">

                            <div className="p-3">
                                <div className="flex flex-col mb-4">
                                    <label className="text-sm text-gray16 font-medium mb-2">Payment Option <span className="text-red">*</span></label>
                                    <select className="input"
                                        value={payment_option}
                                        onChange={(e) => setPaymentOption(e.target.value)}
                                    >
                                        <option value='' disabled hidden >Select Payment Option</option>
                                        <option value="by_milestone">By Milestone</option>
                                        <option value="by_project">By Project</option>
                                    </select>
                                    {formError && !payment_option && <span className="text-red text-sm">Please select a payment option</span>}
                                </div>
                            </div>

                        </div>

                        {payment_option === 'by_project' && (
                            <div className="flex flex-col border border-gray28 rounded-xl mb-6">
                                <div className="p-3">
                                    <div className="flex flex-col mb-4">
                                        <label className="text-sm text-gray16 font-medium mb-2">Bid Price</label>
                                        <input type="number" className="input"
                                            value={total_price}
                                            onChange={(e) => setTotalPrice(e.target.value)}
                                        />
                                        {formError && !total_price && <span className="text-red text-sm">Please enter a bid price</span>}
                                    </div>

                                </div>
                            </div>
                        )}

                        {payment_option === 'by_milestone' && (
                            <div className="flex flex-col border border-gray28 rounded-xl mb-6">

                                {milestoneValue.map((milestone: any, index: number) => (
                                    <div className="p-3" key={index}>

                                        <div className="flex flex-col mb-4">
                                            <label className="text-sm text-gray16 font-medium mb-2">Milestone Description</label>
                                            <textarea className="input"
                                                name='description'
                                                rows={4} cols={50}
                                                value={milestone.description}
                                                onChange={(e) => handleMilestoneChange(e, index)}
                                            ></textarea>
                                            {formError && milestone.description === '' && <span className="text-red text-sm">Please enter a milestone description</span>}
                                        </div>

                                        <div className='flex flex-row items-center gap-2 w-full'>
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm text-gray16 font-medium mb-2">Due Date</label>
                                                <input type="date" className="input"
                                                    name='due_date'
                                                    value={milestone.due_date}
                                                    onChange={(e) => handleMilestoneChange(e, index)}
                                                />
                                                {formError && milestone.due_date === '' && <span className="text-red text-sm">Please enter a due date</span>}
                                            </div>

                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm text-gray16 font-medium mb-2">Amount</label>
                                                <input type="number" className="input"
                                                    name='amount'
                                                    value={milestone.amount}
                                                    onChange={(e) => handleMilestoneChange(e, index)}
                                                />
                                                {formError && milestone.amount === '' && <span className="text-red text-sm">Please enter an amount</span>}
                                            </div>
                                        </div>

                                        {index ? (
                                            <div className="flex justify-end">
                                                <button className="text-sm text-primary font-medium" onClick={handleMilestoneRemove}>Remove Milestone </button>
                                            </div>
                                        ) : (
                                            null
                                        )}

                                    </div>
                                ))}

                                <div className="p-3">
                                    <div className="flex justify-end">
                                        <button className="text-sm text-primary font-medium" onClick={handleMilestoneAdd}>Add More Milestone</button>
                                    </div>
                                </div>

                            </div>
                        )}

                        <div className="flex flex-col border border-gray28 rounded-xl">
                            <div className="p-3">

                                <div className="flex flex-col mb-4">
                                    <label className="text-sm text-gray16 font-medium mb-2">Expected Duration <span className="text-red">*</span></label>
                                    <select className="input"
                                        value={expected_duration}
                                        onChange={(e) => setExpectedDuration(e.target.value)}
                                    >
                                        <option value='' disabled hidden >Select Expected Duration</option>
                                        <option value="1-2 weeks">1-2 weeks</option>
                                        <option value="2-3 weeks">2-3 weeks</option>
                                        <option value="3-4 weeks">3-4 weeks</option>
                                        <option value="4-5 weeks">4-5 weeks</option>
                                        <option value="5-6 weeks">5-6 weeks</option>
                                    </select>
                                    {formError && !expected_duration && <span className="text-red text-sm">Please select an expected duration</span>}
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-sm text-gray16 font-medium mb-2">Cover Letter <span className="text-red">*</span></label>
                                    <textarea className="input"
                                        rows={4} cols={50}
                                        value={cover_letter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                    />
                                    {formError && !cover_letter && <span className="text-red text-sm">Please enter a cover letter</span>}
                                </div>

                                <div className="flex  mt-5">
                                    {loading ? (
                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Submitting...
                                        </button>
                                    ) : (
                                        <button className="filled-btn md:w-full" onClick={handleProposalUpdate}>Update Proposal
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                </>
            </Drawer>
        </>
    )
}

export default Proposal