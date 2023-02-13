import React from 'react'
import Image from 'next/image'
import { CloseDraw, Education1, Empty } from '../../../../assets'
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { shortenText, convertDateBack, convertStartDate } from '../../../../utils/functions'

const Education = (props: any) => {

    // education state
    const [school_name, setSchoolName] = useState('')
    const [start_date, setStartDate] = useState('' as any)
    const [end_date, setEndDate] = useState('' as any)
    const [degree, setDegree] = useState('')
    const [area_of_study, setAreaOfStudy] = useState('')
    const [educationDescription, setEducationDescription] = useState('')
    const [schoolID, setSchoolID] = useState('')
    const [singleEducation, setSingleEducation] = useState({} as any)
    const [editEducation, setEditEducation] = useState(false)
    const [education, setEducation] = useState([] as any)
    const [formError, setFormError] = useState(false)

    // drawer state
    const [isDesktop, setIsDesktop] = React.useState(typeof window !== 'undefined' ? window.innerWidth > 600 : false)

    // education drawer
    const [isOpen, setIsOpen] = React.useState(false)

    const clearEducationState = () => {
        setSchoolName('')
        setStartDate('')
        setEndDate('')
        setDegree('')
        setAreaOfStudy('')
        setEducationDescription('')
        setSingleEducation({})
        setEditEducation(false)
        setSchoolID('')
        setFormError(false)
    }

    useEffect(() => {
        if (singleEducation) {
            setSchoolName(singleEducation.schoolName || '')
            setStartDate(convertDateBack(singleEducation.startDate || ''))
            setEndDate(convertDateBack(singleEducation.endDate || ''))
            setDegree(singleEducation.degree || '')
            setAreaOfStudy(singleEducation.areaOfStudy || '')
            setEducationDescription(singleEducation.description || '')
            setSchoolID(singleEducation.schoolID || '')
        }
    }, [singleEducation])

    useEffect(() => {
        if (props.userDetails) {
            setEducation(props.userDetails?.profile?.merchantInfo?.education || [])
        }
    }, [props.userDetails])

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 600 : false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setIsDesktop])

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    useEffect(() => {
        if (props.success && isOpen) {
            toggleDrawer()
        }
    }, [props.success, isOpen])

    useEffect(() => {
        if (isOpen === false) {
            clearEducationState()
        }
    }, [isOpen])


    // add education
    const addEducationHandler = async (e: any) => {
        e.preventDefault()
        if (!school_name || !start_date || !end_date || !degree || !area_of_study || !educationDescription) {
            setFormError(true)
            return
        }
        const data = {
            school_name,
            start_date: convertStartDate(start_date),
            end_date: convertStartDate(end_date),
            degree,
            area_of_study,
            description: educationDescription
        }
        await props.addMerchantEducation(data)
    }

    // update education
    const updateEducationHandler = async (e: any) => {
        e.preventDefault()

        const data = {
            school_name,
            start_date: convertStartDate(start_date),
            end_date: convertStartDate(end_date),
            degree,
            area_of_study,
            description: educationDescription,
            schoolID
        }
        await props.editMerchantEducation(data)
    }

    // delete education
    const deleteEducationHandler = async (schoolID: any) => {
        if (confirm('Are you sure you want to delete this education?')) {
            await props.removeMerchantEducation(schoolID)
        }
    }


    return (
        <>
            <div className='p-4'>
                <div className="flex justify-end mb-3">
                    <button type='button' className="filled-btn flex items-center justify-center gap-2 md:w-52" onClick={toggleDrawer}>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Education
                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">

                    {education && education.map((item: any, index: number) => (
                        <div className="card border border-gray27 shadow-sm p-4 hover:shadow-2xl transition duration-200 ease-in-out" key={index}>
                            <div className="flex gap-2">
                                <div className="w-20 h-20 flex items-center">
                                    <Image src={Education1} alt='education' />
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg font-medium text-primary6 mb-1">{shortenText(item.schoolName, 16)}</p>
                                    <p className="text-xs text-primary5 font-medium mb-1">{item.degree}</p>
                                    <p className="text-xs text-primary5 font-medium mb-1">{item.startDate} - {item.endDate}</p>
                                    <p className="text-xs text-primary5 font-medium mb-1">{item.areaOfStudy}</p>
                                </div>

                                <div className="flex flex-col gap-2 ml-auto">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-primary4 cursor-pointer">
                                        <FaEdit className="text-primary4"
                                            onClick={() => {
                                                toggleDrawer()
                                                setSingleEducation(item)
                                                setEditEducation(true)
                                            }}
                                        />
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-red cursor-pointer">
                                        <FaTrash className="text-red"
                                            onClick={
                                                () => {
                                                    deleteEducationHandler(item.schoolID)
                                                }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>

                {education.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src={Empty} alt='empty state'
                            width={100}
                            height={100}
                        />
                        <p className="text-lg font-medium text-gray11">No Education Added</p>
                    </div>
                )}

            </div>

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

                        {editEducation ? (
                            <h1 className="text-lg font-medium text-gray39">Edit Education</h1>

                        ) : (
                            <h1 className="text-lg font-medium text-gray39">Add Education</h1>
                        )}

                        <button className="text-gray11" onClick={toggleDrawer}>
                            <Image src={CloseDraw} alt='close' />
                        </button>
                    </div>

                    <div className="px-4 py-5">
                        <>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">School Name</label>
                                <input type="text" className="input"
                                    value={school_name}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                />
                                {formError && !school_name && ( <p className="text-red text-xs font-light mt-1">School name is required</p> )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">Start Date</label>
                                <input type="date" className="input"
                                    value={start_date}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                {formError && !start_date && ( <p className="text-red text-xs font-light mt-1">Start date is required</p> )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">End Date</label>
                                <input type="date" className="input"
                                    value={end_date}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                {formError && !end_date && ( <p className="text-red text-xs font-light mt-1">End date is required</p> )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">Degree</label>
                                <input type="text" className="input"
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                />
                                {formError && !degree && ( <p className="text-red text-xs font-light mt-1">Degree is required</p> )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">Field Of Study</label>
                                <input type="text" className="input"
                                    value={area_of_study}
                                    onChange={(e) => setAreaOfStudy(e.target.value)}
                                />
                                {formError && !area_of_study && ( <p className="text-red text-xs font-light mt-1">Field of study is required</p> )}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="text-sm text-gray16 font-medium mb-2">Description</label>
                                <textarea className="input"
                                    rows={4}
                                    cols={50}
                                    value={educationDescription}
                                    onChange={(e) => setEducationDescription(e.target.value)}
                                />
                                {formError && !educationDescription && ( <p className="text-red text-xs font-light mt-1">Description is required</p> )}
                            </div>

                            {editEducation ? (
                                <div className="flex w-full">
                                    {props.loading ? (
                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Updating...
                                        </button>
                                    ) : (
                                        <button type='button' className="filled-btn" onClick={updateEducationHandler}>
                                            Update
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex w-full">
                                    {props.loading ? (
                                        <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Saving...
                                        </button>
                                    ) : (
                                        <button type='button' className="filled-btn" onClick={addEducationHandler}>
                                            Add Education
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

export default Education