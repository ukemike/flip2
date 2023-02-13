import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Document = (props: any) => {

    // business merchant state
    const [cac_number, setCacNumber] = useState('')
    const [cac_document, setCacDocument] = useState('' as any)
    const [identity_type, setIdentityType] = useState('')
    const [identity_document, setIdentityDocument] = useState('' as any)

    useEffect(() => {
        if (props.userDetails) {
            setCacNumber(props.userDetails?.profile?.merchantInfo?.cacNumber || '')
            // setCacDocument(userDetails?.profile?.merchantInfo?.cacDocument || '')
            // setIdentityDocument(userDetails?.profile?.merchantInfo?.identityDocument || '')
            setIdentityType(props.userDetails?.profile?.merchantInfo?.identityType || '')
        }
    }, [props.userDetails])


    useEffect(() => {
        if (props.success) {
            setCacDocument('')
            setIdentityDocument('')
        }
    }, [props.success])


    // update cac
    const updateCacProfileHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            cac_number,
            cac_document,
            identity_type,
            identity_document,
        }
        await props.updateBusinessMerchantProfile(data)
    }



    return (
        <>
            <div className='p-4'>
                <div className='flex flex-col gap-4 w-full'>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>CAC Number</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={cac_number}
                                onChange={(e) => setCacNumber(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Identity Type</label>
                            <select className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={identity_type}
                                onChange={(e) => setIdentityType(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Identity Type</option>
                                <option value="National ID">National ID</option>
                                <option value="International Passport">International Passport</option>
                                <option value="Drivers License">Drivers License</option>
                            </select>
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>
                                <input type="file" className="hidden"
                                    onChange={(e: any) => setCacDocument(e.target.files[0])}
                                />
                                <div className="flex flex-col items-center justify-center w-full h-40 bg-white rounded-md cursor-pointer">
                                    <div className="flex flex-col items-center justify-center">
                                        {cac_document ? (
                                            <p className="text-base text-gray11">{cac_document.name}</p>
                                        ) : (
                                            <FaCloudUploadAlt className="text-6xl text-primary6" />
                                        )}

                                    </div>
                                    {cac_document ? (
                                        ''
                                    ) : (
                                        <p className="text-sm text-primary6">Upload CAC Document</p>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>
                                <input type="file" className="hidden"
                                    onChange={(e: any) => setIdentityDocument(e.target.files[0])}
                                />
                                <div className="flex flex-col items-center justify-center w-full h-40 bg-white rounded-md cursor-pointer">
                                    <div className="flex flex-col items-center justify-center">
                                        {identity_document ? (
                                            <p className="text-base text-gray11">{identity_document.name}</p>
                                        ) : (
                                            <FaCloudUploadAlt className="text-6xl text-primary6" />
                                        )}
                                    </div>
                                    {identity_document ? (
                                        ''
                                    ) : (
                                        <p className="text-sm text-primary6">Upload Identity Document</p>
                                    )}
                                </div>
                            </label>
                        </div>

                    </div>

                    <>
                        {props.loading ? (
                            <div className='flex flex-col md:flex-row gap-5 w-full'>
                                <button className="filled-btn flex items-center justify-center gap-3" disabled>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    Saving...
                                </button>
                            </div>
                        ) : (

                            <div className='flex flex-col md:flex-row gap-5 w-full'>
                                <button type='button' className="filled-btn md:w-full" onClick={updateCacProfileHandler}>Save
                                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                </button>
                            </div>
                        )}
                    </>


                </div>
            </div>
        </>
    )
}

export default Document