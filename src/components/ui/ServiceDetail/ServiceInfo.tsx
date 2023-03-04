import React from 'react'
import Image from 'next/image'
import { Medal, Location3, Message, Avatar } from '../../../assets'
import { formatAmount } from '../../../utils/functions'

interface ServiceInfoProps {
    pricing: number;
    fullName: string;
    image: string;
    serviceName: string;
    location: string;
    description: string;
    loading: boolean;
    handleRequestService: () => void;
}

const ServiceInfo = (props: ServiceInfoProps) => {
    const { pricing, fullName, image, serviceName, location, description, loading, handleRequestService } = props
    return (
        <>
            <div className="w-full md:w-1/3">
                <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4">
                    <p className="text-base font-medium text-gray32 mb-1">N{formatAmount(pricing)}</p>
                    <p className="text-sm font-normal text-gray11">Per Service</p>
                </div>

                <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4 mt-[10px]">
                    <p className="text-sm font-normal text-gray11">About {fullName}</p>

                    <div className='flex items-center gap-2 mt-4 mb-2'>
                        {image ? (
                            <Image src={image} alt="user" className="rounded-full" width={100} height={100} />
                        ) : (
                            <Image src={Avatar} alt="user" className="rounded-full" width={100} height={100} />
                        )}
                        <div>
                            <p className="text-sm text-gray18 font-light">
                                {serviceName}
                            </p>
                            <div className='flex items-center gap-2'>
                                <Image src={Medal} alt='' />
                                <p className="text-sm text-gray18 font-light">80% Job Success</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <Image src={Location3} alt='' />
                                <p className="text-sm text-gray18 font-light">{location}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className="text-sm text-gray18 font-light">
                            {description}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 flex-col'>
                        <button className='outline-btn gap-3 text-primary3 bg-white'>
                            <Image src={Message} alt='' />
                            Send A Message
                        </button>
                        {loading ? (
                            <button className="filled-btn flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            </button>
                        ) : (
                            <button className='filled-btn'
                                onClick={() => {
                                    handleRequestService()
                                }}
                            >
                                Request Service
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceInfo