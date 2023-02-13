/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const MainProfile = (props: any) => {

    // user state
    const [address, setAddress] = useState('')
    const [date_of_birth, setDateOfBirth] = React.useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [state, setState] = useState('')
    const [state_id, setStateId] = useState('')
    const [lga, setLga] = useState('')
    const [lga_id, setLgaId] = useState('')

    // personal merchant state
    const [bio, setBio] = useState('')
    const [job_title, setJobTitle] = useState('')
    const [years_of_experience, setYearsOfExperience] = useState('')
    const [charges_per_hour, setChargesPerHour] = useState('')
    const [hours_per_week, setHoursPerWeek] = useState('')

    useEffect(() => {
        if (props.userDetails) {
            setAddress(props.userDetails?.address || '')
            setDateOfBirth(props.userDetails?.dateOfBirth || '')
            setEmail(props.userDetails?.email || '')
            setFirstName(props.userDetails?.firstName || '')
            setGender(props.userDetails?.gender || '')
            setLastName(props.userDetails?.lastName || '')
            setPhone(props.userDetails?.phone || '')
            setBio(props.userDetails?.profile?.bio || '')
            setJobTitle(props.userDetails?.profile?.merchantInfo?.jobTitle || '')
            setYearsOfExperience(props.userDetails?.profile?.merchantInfo?.yearsOfExperience || '')
            setChargesPerHour(props.userDetails?.profile?.merchantInfo?.chargesPerHour || '')
            setHoursPerWeek(props.userDetails?.profile?.merchantInfo?.hoursPerWeek || '')
            setState(props.userDetails?.state?.stateName || '')
            setLga(props.userDetails?.lga?.lgaName || '')
            setStateId(props.userDetails?.state?.stateID || '')
            setLgaId(props.userDetails?.lga?.lgaID || '')
        }
    }, [props.userDetails])

    // update consumer profile
    const updateConsumerProfileHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            firstname,
            lastname,
            email,
            phone,
            address,
            gender,
            date_of_birth,
            state_id,
            lga_id,
        }
        await props.updateConsumerProfile(data)
    }

    // update business merchant profile
    const updateBusinessMerchantProfileHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            firstname,
            lastname,
            email,
            phone,
            address,
            gender,
            date_of_birth,
            bio,
            state_id,
            lga_id,
        }
        await props.updateBusinessMerchantProfile(data)
    }

    // update personal merchant profile
    const updatePersonalMerchantProfileHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            firstname,
            lastname,
            email,
            phone,
            address,
            gender,
            date_of_birth,
            bio,
            job_title,
            years_of_experience,
            charges_per_hour,
            hours_per_week,
            state_id,
            lga_id,
        }
        await props.updatePersonalMerchantProfile(data)
    }

    useEffect(() => {
        if (state_id !== '') {
            props.getLgas(state_id)
        }
    }, [state_id])


    return (
        <>
            <div className='p-4'>

                <div className='flex flex-col gap-4 w-full'>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>First Name</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={firstname || ''}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Last Name</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={lastname || ''}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Email</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Phone</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={phone || ''}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Gender</label>
                            <select className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={gender || ''}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Gender</option>
                                <option value="Female">Male</option>
                                <option value="Male">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 md:w-full'>
                            <label className='text-sm font-medium text-gray16'>Date of Birth</label>
                            <input type="date" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={date_of_birth || ''}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>State</label>
                            <Select
                                className="rounded-md text-sm font-light text-gray11 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                options={
                                    props.states && props.states.map((state: any, index: any) => (
                                        { value: state.stateID, label: state.stateName }
                                    ))
                                }
                                placeholder="Select State"
                                value={state ? { value: state_id, label: state } : null}
                                onChange={(e: any) => {
                                    setStateId(e.value);
                                    setState(e.label);
                                }}

                            />

                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>City</label>
                            <Select
                                className="rounded-md text-sm font-light text-gray11 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                options={
                                    props.lgas && props.lgas.map((lga: any, index: any) => (
                                        { value: lga.lgaID, label: lga.lgaName }
                                    ))
                                }
                                placeholder="Select City"
                                value={lga ? { value: lga_id, label: lga } : null}
                                onChange={(e: any) => {
                                    setLgaId(e.value);
                                    setLga(e.label);
                                }}

                            />

                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Address</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={address || ''}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                    </div>

                    {props.isRole === 'merchant' && props.isMerchantType === 'personal' && (
                        <>
                            <div className='flex flex-col md:flex-row gap-5 w-full'>

                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='text-sm font-medium text-gray16'>Job Title</label>
                                    <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        value={job_title || ''}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='text-sm font-medium text-gray16'>Hours Per Week</label>
                                    <input type="number" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        value={hours_per_week || ''}
                                        onChange={(e) => setHoursPerWeek(e.target.value)}
                                    />
                                </div>

                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='text-sm font-medium text-gray16'>Charges Per Hour</label>
                                    <input type="number" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        value={charges_per_hour || ''}
                                        onChange={(e) => setChargesPerHour(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className='flex flex-col md:flex-row gap-5 w-full'>

                                <div className='flex flex-col gap-2 w-1/3'>
                                    <label className='text-sm font-medium text-gray16'>Years of Experience</label>
                                    <input type="number" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        value={years_of_experience || ''}
                                        onChange={(e) => setYearsOfExperience(e.target.value)}
                                    />
                                </div>

                            </div>
                        </>
                    )}


                    {props.isRole === 'merchant' && (
                        <>

                            <div className='flex flex-col md:flex-row gap-5 w-full'>

                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='text-xs text-primary5'>Bio</label>
                                    <textarea className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        rows={4} cols={50}
                                        value={bio || ''}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>

                            </div>
                        </>
                    )}




                    {props.isRole === 'merchant' && props.isMerchantType === 'personal' && (
                        <>
                            {props.loading ? (
                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Saving...
                                    </button>
                                </div>
                            ) : (

                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button type='button' className="filled-btn md:w-full" onClick={updatePersonalMerchantProfileHandler}>
                                        Save
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {props.isRole === 'merchant' && props.isMerchantType === 'business' && (
                        <>
                            {props.loading ? (
                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Saving...
                                    </button>
                                </div>
                            ) : (

                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button type='button' className="filled-btn md:w-full" onClick={updateBusinessMerchantProfileHandler}>
                                        Save
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {props.isRole === 'consumer' && (
                        <>
                            {props.loading ? (
                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button className="filled-btn flex items-center justify-center gap-3 w-full" disabled>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        Saving...
                                    </button>
                                </div>
                            ) : (

                                <div className='flex flex-col md:flex-row gap-5 w-full'>
                                    <button type='button' className="filled-btn md:w-full" onClick={updateConsumerProfileHandler}>
                                        Save
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                </div>

            </div>
        </>
    )
}

export default MainProfile