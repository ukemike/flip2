/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Avatar, ProfileBanner } from '../../../assets'
import { useAppSelector } from '../../../redux/hooks'
import { useEffect, useState } from 'react'
import Education from './personalProfile/Education'
import Experience from './personalProfile/Experience'
import Project from './personalProfile/Project'
import LanguageSkill from './personalProfile/LanguageSkill'
import Document from './businessProfile/Document'
import Transactions from './Transactions'
import BankDetails from './BankDetails'
import MainProfile from './MainProfile'
import { FaCloudUploadAlt } from 'react-icons/fa'
import Loader from '../loader/Loader'

const Profile = (props: any) => {

    const { role, merchant_type } = useAppSelector((state) => state.auth)

    const [isMerchantType, setIsMerchantType] = useState('' as any)
    const [isRole, setIsRole] = useState('' as any)

    useEffect(() => {
        setIsMerchantType(merchant_type)
        setIsRole(role)
    }, [merchant_type, role])

    const [activeTab, setActiveTab] = React.useState(0)

    // user state
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [userRole, setUserRole] = useState('')
    const [image, setImage] = useState('' as any)
    const [imagePreview, setImagePreview] = useState('')

    // personal merchant state
    const [bio, setBio] = useState('')

    useEffect(() => {
        if (props.userDetails) {
            setAddress(props.userDetails?.address || '')
            setEmail(props.userDetails?.email || '')
            setPhone(props.userDetails?.phone || '')
            setBio(props.userDetails?.profile?.bio || '')
            setFullName(props.userDetails?.fullName || '')
            setUserRole(props.userDetails?.role || '')
            setImage(props.userDetails?.image)
        }
    }, [props.userDetails])

    const handleUpload = (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];

        // const reader = new window.FileReader() as any;
        // reader.readAsArrayBuffer(file);
        // reader.onloadend = () => {
        //     //convert to base64
        //     const base64 = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        //     setImagePreview(`data:image/png;base64,${base64}`);
        // };

            props.updateProfilePicture({
                image: file
            })

    };

    return (
        <>
            {props.loadingFetchProfile || props.loadingUpdateProfilePicture ? (
                <Loader />
            ) : (
                <>
                    <div className='hidden md:block'>
                        <Image src={ProfileBanner} alt='profile banner' objectFit='cover' />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-6">
                        <div className="w-full md:w-1/4 relative">
                            <div className="card bg-gray38 md:h-[465px] absolute top-[-20px] md:top-[-80px] left-0 right-0">
                                <div className='flex flex-col items-center justify-center pt-3'>
                                    <div className='bg-white rounded-full w-40 h-40 flex items-center justify-center'>
                                        <div className='border-4 border-primary6 rounded-full w-[150px] h-[150px] relative'>

                                            {image && (
                                                <Image src={image} alt='user 1' width={146} height={146} className='rounded-full' style={{ width: '146px', height: '146px' }} />
                                            )}
                                            {/* {!image && imagePreview && (
                                                <img src={imagePreview} alt='user 2' width={146} height={146} className='rounded-full' style={{ width: '146px', height: '146px' }} />
                                            )} */}
                                            {!image && (
                                                <Image src={Avatar} alt='user 3' width={146} height={146} className='rounded-full mx-auto' />
                                            )}

                                            <div className='absolute bottom-0 right-0'>
                                                {/* upload image */}
                                                <div className='bg-primary6 rounded-full w-8 h-8 flex items-center justify-center'>
                                                    <label className='cursor-pointer relative w-full h-full flex items-center justify-center'>
                                                        <FaCloudUploadAlt className='text-white text-xs' />
                                                        <input type='file' className='hidden'
                                                            onChange={
                                                                (e) => {
                                                                    handleUpload(e)
                                                                }
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-center pt-3'>
                                        <h1 className='text-[20px] font-medium text-primary6'>{fullName}</h1>
                                        <p className='text-white text-xs font-light mb-2'>{email}</p>
                                        <p className='text-white text-xs font-light mb-2'>{phone}</p>
                                        <p className='text-white text-xs font-light mb-2'>{address}</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-3/4">
                            <div className='mt-[18.5rem] md:mt-0 bg-backg rounded-[10px] w-full gap-10 shadow-xl'>

                                <div className='flex-row border-b-[1px] border-b-gray27 flex gap-10 overflow-x-auto w-full bg-white rounded-tl-[10px]'>

                                    <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 0 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(0)}>
                                        <p className={`text-base font-medium ${activeTab === 0 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Profile</p>
                                    </div>

                                    {isRole === 'merchant' && isMerchantType === 'business' && (
                                        <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 3 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(3)}>
                                            <p className={`text-base font-medium ${activeTab === 3 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Documents</p>
                                        </div>
                                    )}

                                    {isRole === 'merchant' && isMerchantType === 'personal' && (
                                        <>
                                            <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 4 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(4)}>
                                                <p className={`text-base font-medium ${activeTab === 4 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Education</p>
                                            </div>

                                            <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 5 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(5)}>
                                                <p className={`text-base font-medium ${activeTab === 5 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Experience</p>
                                            </div>

                                            <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 6 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(6)}>
                                                <p className={`text-base font-medium ${activeTab === 6 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Projects</p>
                                            </div>

                                            <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 7 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(7)}>
                                                <p className={`text-base font-medium ${activeTab === 7 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Language/Skills</p>
                                            </div>

                                        </>
                                    )}

                                    <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 1 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(1)}>
                                        <p className={`text-base font-medium ${activeTab === 1 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Bank Details</p>
                                    </div>

                                    <div className={`flex items-center justify-center py-2 px-2 cursor-pointer ${activeTab === 2 ? 'text-white bg-primary6' : ''}`} onClick={() => setActiveTab(2)}>
                                        <p className={`text-base font-medium ${activeTab === 2 ? 'text-white' : 'text-gray22'}`} style={{ width: 'max-content' }}>Transaction History</p>
                                    </div>

                                </div>

                                <br />

                                {/* MAIN PROFILE */}
                                {activeTab === 0 && (
                                    <MainProfile
                                        success={props.success}
                                        userDetails={props.userDetails}
                                        loading={props.loading}
                                        updateConsumerProfile={props.updateConsumerProfile}
                                        updateBusinessMerchantProfile={props.updateBusinessMerchantProfile}
                                        updatePersonalMerchantProfile={props.updatePersonalMerchantProfile}
                                        isRole={isRole}
                                        isMerchantType={isMerchantType}
                                        states={props.states}
                                        lgas={props.lgas}
                                        getLgas={props.getLgas}
                                    />
                                )}

                                {/* BANK DETAILS */}
                                {activeTab === 1 && (
                                    <BankDetails
                                        userDetails={props.userDetails}
                                        loading={props.loading}
                                        updateBankDetails={props.updateBankDetails}
                                    />
                                )}

                                {/* TRANSACTIONS */}
                                {activeTab === 2 && (
                                    <Transactions
                                        transactions={props.transactions}
                                    />
                                )}

                                {/* DOCUMENT */}
                                {activeTab === 3 && (
                                    <Document
                                        success={props.success}
                                        userDetails={props.userDetails}
                                        loading={props.loading}
                                        updateBusinessMerchantProfile={props.updateBusinessMerchantProfile}
                                    />
                                )}

                                {/* EDUCATION */}
                                {activeTab === 4 && (
                                    <Education
                                        success={props.success}
                                        userDetails={props.userDetails}
                                        addMerchantEducation={props.addMerchantEducation}
                                        editMerchantEducation={props.editMerchantEducation}
                                        removeMerchantEducation={props.removeMerchantEducation}
                                        loading={props.loading}
                                    />
                                )}

                                {/* EXPERIENCR */}
                                {activeTab === 5 && (
                                    <Experience
                                        success={props.success}
                                        userDetails={props.userDetails}
                                        addMerchantWorkHistory={props.addMerchantWorkHistory}
                                        editMerchantWorkHistory={props.editMerchantWorkHistory}
                                        removeMerchantWorkHistory={props.removeMerchantWorkHistory}
                                        loading={props.loading}
                                    />
                                )}

                                {/* PROJECT */}
                                {activeTab === 6 && (
                                    <Project
                                        success={props.success}
                                        userDetails={props.userDetails}
                                        addMerchantProjects={props.addMerchantProjects}
                                        editMerchantProjects={props.editMerchantProjects}
                                        removeMerchantProjects={props.removeMerchantProjects}
                                        loading={props.loading}
                                    />
                                )}

                                {/* LANGUAGE & SKILL */}
                                {activeTab === 7 && (
                                    <LanguageSkill
                                        userDetails={props.userDetails}
                                        addMerchantLanguages={props.addMerchantLanguages}
                                        addMerchantSkills={props.addMerchantSkills}
                                        loading={props.loading}
                                    />
                                )}

                            </div>
                        </div>
                    </div>



                </>
            )}

        </>

    )
}

export default Profile