import React from 'react'
import Image from 'next/image'
import { Work, Empty, CloseDraw } from '../../../../assets'
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { shortenText, convertDateBack, convertStartDate } from '../../../../utils/functions'

const Experience = (props: any) => {
    // personal merchant state
    const [workHistory, setWorkHistory] = useState([] as any)
    const [job_title, setJobTitle] = useState('')

    // work history state
    const [company_name, setCompanyName] = useState('')
    const [job_description, setJobDescription] = useState('')
    const [workStartDate, setWorkStartDate] = useState('' as any)
    const [workEndDate, setWorkEndDate] = useState('' as any)
    const [editWork, setEditWork] = useState(false)
    const [singleWork, setSingleWork] = useState({} as any)
    const [workID, setWorkID] = useState('')
    const [formError, setFormError] = useState(false)


    const clearWorkHistoryState = () => {
        setCompanyName('')
        setJobDescription('')
        setWorkStartDate('')
        setWorkEndDate('')
        setEditWork(false)
        setSingleWork({})
        setWorkID('')
        setFormError(false)
    }

    useEffect(() => {
        if (singleWork) {
            console.log(singleWork.jobDescription, 'singleWork des')
            setJobTitle(singleWork.workTitle)
            setCompanyName(singleWork.companyName)
            setJobDescription(singleWork.jobDescription)
            setWorkStartDate(convertDateBack(singleWork.startDate))
            setWorkEndDate(convertDateBack(singleWork.endDate))
            setWorkID(singleWork.workID)
        }
    }, [singleWork])


    useEffect(() => {
        if (props.userDetails) {
            setWorkHistory(props.userDetails?.profile?.merchantInfo?.workHistory || [])
        }
    }, [props.userDetails])

    // drawer state
    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])


    // work history drawer
    const [isOpen2, setIsOpen2] = React.useState(false)
    const toggleDrawer2 = () => {
        setIsOpen2((prevState) => !prevState)
    }


    useEffect(() => {
        if (props.success && isOpen2) {
            toggleDrawer2()
        }
    }, [props.success, isOpen2])

    useEffect(() => {
        if (isOpen2 === false) {
            clearWorkHistoryState()
        }
    }, [isOpen2])



    // add work history
    const addWorkHistoryHandler = async (e: any) => {
        e.preventDefault()
        if(!company_name || !job_title || !job_description || !workStartDate || !workEndDate) {
            setFormError(true)
            return
        }
        const data = {
            company_name,
            start_date: convertStartDate(workStartDate),
            end_date: convertStartDate(workEndDate),
            job_title,
            description: job_description
        }
        await props.addMerchantWorkHistory(data)
    }

    // update work history
    const updateWorkHistoryHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            company_name,
            start_date: convertStartDate(workStartDate),
            end_date: convertStartDate(workEndDate),
            job_title,
            description: job_description,
            workID
        }
        await props.editMerchantWorkHistory(data)
    }

    // delete work history
    const deleteWorkHistoryHandler = async (workID: any) => {
        if (confirm('Are you sure you want to delete this work history?')) {
            await props.removeMerchantWorkHistory(workID)
        }
    }

    return (
        <>
            <div className='p-4'>
                <div className="flex justify-end mb-3">
                    <button type='button' className="filled-btn flex items-center justify-center gap-2 md:w-56" onClick={toggleDrawer2}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Work Experience
                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {workHistory && workHistory.map((item: any, index: number) => (
                        <div className="card border border-gray27 shadow-sm p-4 hover:shadow-2xl transition duration-200 ease-in-out" key={index}>
                            <div className="flex gap-2">
                                <div className="w-20 h-20 flex items-center">
                                    <Image src={Work} alt='education' />
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg font-medium text-primary6 mb-1">{shortenText(item.workTitle, 16)}</p>
                                    <p className="text-xs text-primary5 font-medium mb-1">{item.companyName}</p>
                                    <p className="text-xs text-primary5 font-medium mb-1">{item.startDate} - {item.endDate}</p>
                                    {/* <p className="text-xs text-primary5 font-medium mb-1">Computer Science</p> */}
                                </div>

                                <div className="flex flex-col gap-2 ml-auto">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-primary4 cursor-pointer">
                                        <FaEdit className="text-primary4"
                                            onClick={
                                                () => {
                                                    toggleDrawer2()
                                                    setEditWork(true)
                                                    setSingleWork(item)
                                                }}
                                        />
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-red cursor-pointer">
                                        <FaTrash className="text-red"
                                            onClick={
                                                () => {
                                                    deleteWorkHistoryHandler(item.workID)
                                                }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
                {workHistory.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src={Empty} alt='empty state'
                            width={100}
                            height={100}
                        />
                        <p className="text-lg font-medium text-gray11">No Work Experience Added</p>
                    </div>
                )}
            </div>



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

                        {editWork ? (
                            <h1 className="text-lg font-medium text-gray39">Edit Work Experience</h1>

                        ) : (
                            <h1 className="text-lg font-medium text-gray39">Add Work Experience</h1>
                        )}

                        <button className="text-gray11" onClick={toggleDrawer2}>
                            <Image src={CloseDraw} alt='close' />
                        </button>
                    </div>

                    <div className="px-4 py-5">

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Job Title</label>
                            <input type="text" className="input"
                                value={job_title}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                            {formError && !job_title && ( <p className="text-red font-light text-xs">Job title is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Company Name</label>
                            <input type="text" className="input"
                                value={company_name}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {formError && !company_name && ( <p className="text-red font-light text-xs">Company name is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Start Date</label>
                            <input type="date" className="input"
                                value={workStartDate}
                                onChange={(e) => setWorkStartDate(e.target.value)}
                            />
                            {formError && !workStartDate && ( <p className="text-red font-light text-xs">Start date is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">End Date</label>
                            <input type="date" className="input"
                                value={workEndDate}
                                onChange={(e) => setWorkEndDate(e.target.value)}
                            />
                            {formError && !workEndDate && ( <p className="text-red font-light text-xs">End date is required</p> )}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-sm text-gray16 font-medium mb-2">Job Description</label>
                            <textarea className="input"
                                rows={4}
                                cols={50}
                                value={job_description}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            {formError && !job_description && ( <p className="text-red font-light text-xs">Job description is required</p> )}
                        </div>

                        {editWork ? (
                            <div className="flex w-full">
                                {props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Updating...
                                    </button>
                                ) : (

                                    <button type='button' className="filled-btn" onClick={updateWorkHistoryHandler}>
                                        Update Experience
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex w-full">
                                {props.loading ? (
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Adding...
                                    </button>
                                ) : (
                                    <button type='button' className="filled-btn" onClick={addWorkHistoryHandler}>
                                        Add Experience
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </div>
                        )}


                    </div>
                </>


            </Drawer>
        </>
    )
}

export default Experience