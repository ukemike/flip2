import React from 'react'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { shortenText, getPostedDate, formatDate } from '../../../utils/functions'
import { Search1, CloseDraw, Search2, PaginationNext, PaginationPrev } from '../../../assets'
import Image from 'next/image'
import { useSearchAndPagination } from '../../../services/paginationHook'
import Loader from '../loader/Loader'

const Jobs = (props: any) => {

    // proposal state
    const [payment_option, setPaymentOption] = useState('')
    const [expected_duration, setExpectedDuration] = useState('')
    const [cover_letter, setCoverLetter] = useState('')
    const [total_price, setTotalPrice] = useState('')
    const [milestones, setMilestones] = useState([] as any)
    const [formError, setFormError] = useState(false)
    const [singleJob, setSingleJob] = useState({} as any)

    const [itemsPerPage, setItemsPerPage] = React.useState(5);

    const { currentItems, currentPage, pages, paginate, handleNextBtn, handlePrevBtn, handleSearchJob, search } = useSearchAndPagination(props.jobs, itemsPerPage);

    const handleItemsPerPage = (e: any) => {
        setItemsPerPage(e.target.value);
    }


    // drawer state
    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])

    // job details drawer
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    // job details drawer
    const [isOpen2, setIsOpen2] = React.useState(false)
    const toggleDrawer2 = () => {
        setIsOpen2((prevState) => !prevState)
    }

    React.useEffect(() => {
        if (isOpen2 === false) {
            clearForm()
        }
    }, [isOpen2])

    React.useEffect(() => {
        if (props.successProposal && isOpen2) {
            toggleDrawer2()
        }
    }, [props.successProposal, isOpen2])

    const [milestoneValue, setMilestoneValue] = useState([{ description: '', due_date: '', amount: '' }] as any)

    const handleMilestoneChange = (e: any, index: any) => {
        let newMilestoneValue = [...milestoneValue]
        newMilestoneValue[index][e.target.name] = e.target.value
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

    const handleProposalSubmit = (e: any) => {
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
                    milestones,
                    jobID: singleJob.jobID
                }
                props.createProposal(data)
            } else {
                const data = {
                    payment_option,
                    expected_duration,
                    cover_letter,
                    total_price,
                    jobID: singleJob.jobID
                }
                props.createProposal(data)
            }
        }
    }

    const clearForm = () => {
        setPaymentOption('')
        setExpectedDuration('')
        setCoverLetter('')
        setTotalPrice('')
        setSingleJob({})
        setMilestones([])
        setMilestoneValue([{ description: '', due_date: '', amount: '' }])
        setFormError(false)
    }


    return (
        <>
            {props.loadingFetchJobs ? (
                <Loader />
            ) : (
                <>

                    <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center mb-5 w-full">
                        <div className="flex items-center w-full">
                            <div className="flex items-center relative w-full">
                                <input type="text" className="w-full bg-gray-100 border-[1px] border-gray24 rounded-[10px] md:w-[400px] py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search jobs"
                                    value={search}
                                    onChange={handleSearchJob}
                                />
                                <div className="absolute top-2 left-3">
                                    <Image src={Search2} alt="search" />
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center justify-end gap-4 w-full">

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

                        {currentItems && currentItems.map((job: any, index: number) => (
                            <div className="card hover:shadow-2xl transition duration-200 ease-in-out cursor-pointer p-6" onClick={
                                () => {
                                    toggleDrawer()
                                    setSingleJob(job)
                                }
                            } key={index}>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-base font-semibold text-black-100">{shortenText(job.headline, 25)}</h1>
                                        <span className="text-xs text-gray18 font-light ml-2">{getPostedDate(job.datePosted)}</span>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Budget:</span>
                                            <span className="text-sm font-semibold text-gray33">${job.budget}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Duration:</span>
                                            <span className="text-sm font-semibold text-gray33">{job.jobDuration}</span>
                                        </div>
                                    </div>

                                    {job.skillsNeeded && job.skillsNeeded.length > 0 && (
                                        <div className="flex flex-wrap mt-2">
                                            {job.skillsNeeded.map((skill: any, index: number) => (
                                                <span className="text-sm text-white px-3 py-1 font-semibold bg-primary4 rounded-[4px] mb-2 mr-2" key={index}>{skill.skill}</span>
                                            ))}
                                        </div>
                                    )}


                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Experience:</span>
                                            <span className="text-sm font-semibold text-gray33">{job.experienceLevel}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Scope:</span>
                                            <span className="text-sm font-semibold text-gray33">{job.jobScope}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Budget Negotiable:</span>
                                            <span className="text-sm font-semibold text-gray33">
                                                {job.isBudgetNegotiable === true ? 'Yes' : 'No'}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Active:</span>
                                            <span className="text-sm font-semibold text-gray33">
                                                {job.isActive === true ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex mt-2 break-all">
                                        <span className="text-sm font-light text-gray33">
                                            {shortenText(job.description, 90)}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Date posted:</span>
                                            <span className="text-sm font-semibold text-gray33">{formatDate(job.datePosted)}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {currentItems && currentItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center mt-20">
                            <Image src={Search1} alt="search" />
                            <p className="text-gray11 text-lg mt-5">No jobs found</p>
                        </div>
                    )}

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

                        <h1 className="text-lg font-semibold text-gray39">Gig Details</h1>

                        <button className="text-gray11" onClick={toggleDrawer}>
                            <Image src={CloseDraw} alt="" />
                        </button>
                    </div>

                    <div className="px-4 py-5">
                        <div className="flex flex-col">
                            <div className="flex flex-col border border-gray28 rounded-xl">

                                <div className="p-3">
                                    <div className="flex mb-4 break-all">
                                        <h1 className="text-xl font-semibold text-gray33 ">{singleJob.headline}</h1>
                                    </div>


                                    <div className="flex gap-2 mt-2">
                                        <span className="text-sm font-light text-gray33 mr-1">{getPostedDate(singleJob.datePosted)}</span>
                                    </div>


                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">

                                    <div className="flex gap-2 mt-2 break-all">
                                        <span className="text-sm font-light text-gray33 mr-1">{singleJob.description}</span>
                                    </div>

                                </div>

                                <hr className="border-gray28" />


                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Budget:</span>
                                            <span className="text-sm font-semibold text-gray33">${singleJob.budget}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Duration:</span>
                                            <span className="text-sm font-semibold text-gray33">{singleJob.jobDuration}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Experience:</span>
                                            <span className="text-sm font-semibold text-gray33">{singleJob.experienceLevel}</span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Scope:</span>
                                            <span className="text-sm font-semibold text-gray33">{singleJob.jobScope}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />

                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Budget Negotiable:</span>
                                            <span className="text-sm font-semibold text-gray33">
                                                {singleJob.isBudgetNegotiable === true ? 'Yes' : 'No'}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-sm font-light text-gray33 mr-1">Active:</span>
                                            <span className="text-sm font-semibold text-gray33">
                                                {singleJob.isActive === true ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray28" />

                                {/* skills */}
                                {singleJob.skillsNeeded && singleJob.skillsNeeded.length > 0 && (
                                    <div className="p-3">
                                        <h1 className="text-base font-semibold text-gray33">Required Skills</h1>
                                        <div className="flex flex-wrap mt-2">
                                            {singleJob.skillsNeeded.map((skill: any, index: number) => (
                                                <span className="text-sm text-white px-3 py-1 font-medium bg-primary4 rounded-[4px] mb-2 mr-2" key={index}>{skill.skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <hr className="border-gray28" />

                                {/* date posted */}
                                <div className="p-3">
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-sm font-light text-gray33 mr-1">Date posted:</span>
                                        <span className="text-sm font-semibold text-gray33">
                                            {formatDate(singleJob.datePosted)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* submit proposal endpoint */}
                        <div className="flex  mt-5">
                            <button className="filled-btn "
                                onClick={
                                    () => {
                                        toggleDrawer()
                                        toggleDrawer2()
                                    }
                                }
                            >Submit Proposal
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
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

                        <h1 className="text-lg font-semibold text-gray39">Submit Proposal</h1>

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
                                    {formError && !payment_option && <span className="text-red text-sm font-light">Please select a payment option</span>}
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
                                        {formError && !total_price && <span className="text-red text-sm font-light">Please enter a bid price</span>}
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
                                            {formError && milestone.description === '' && <span className="text-red text-sm font-light">Please enter a milestone description</span>}
                                        </div>

                                        <div className='flex flex-row items-center gap-2 w-full'>
                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm text-gray16 font-medium mb-2">Due Date</label>
                                                <input type="date" className="input"
                                                    name='due_date'
                                                    value={milestone.due_date}
                                                    onChange={(e) => handleMilestoneChange(e, index)}
                                                />
                                                {formError && milestone.due_date === '' && <span className="text-red text-sm font-light">Please enter a due date</span>}
                                            </div>

                                            <div className="flex flex-col mb-4 w-full">
                                                <label className="text-sm text-gray16 font-medium mb-2">Amount</label>
                                                <input type="number" className="input"
                                                    name='amount'
                                                    value={milestone.amount}
                                                    onChange={(e) => handleMilestoneChange(e, index)}
                                                />
                                                {formError && milestone.amount === '' && <span className="text-red text-sm font-light">Please enter an amount</span>}
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
                                    {formError && !expected_duration && <span className="text-red text-sm font-light">Please select an expected duration</span>}
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="text-sm text-gray16 font-medium mb-2">Cover Letter <span className="text-red">*</span></label>
                                    <textarea className="input"
                                        rows={4} cols={50}
                                        value={cover_letter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                    />
                                    {formError && !cover_letter && <span className="text-red text-sm font-light">Please enter a cover letter</span>}
                                </div>

                                <div className="flex  mt-5">
                                    {props.loadingProposal ? (
                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Submitting...
                                        </button>
                                    ) : (
                                        <button className="filled-btn" onClick={handleProposalSubmit}>Submit Proposal
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

export default Jobs