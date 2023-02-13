/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Medal, Location3, Call, Message, Avatar, ArrowRight1, ArrowLeft, Location2, NoImage } from '../../../assets'
import ReactStars from 'react-stars'
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct'
import { shortenText, formatAmount } from '../../../utils/functions'

const ServiceDetails = (props: any) => {

    const [itemsPerPage, setItemsPerPage] = React.useState(4);

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(props.services, itemsPerPage);

    const handleRequestService = () => {
        props.requestService({
            serviceID: props.service.service.serviceID,
        })
    }
    
    return (
        <>
            {props.loadingFetchServices || Object.keys(props.service).length === 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="pt-6">

                    <div className="flex flex-col md:flex-row md:gap-5 pt-3 mb-6">
                        <div className="w-full md:w-2/3">

                            {/* service image */}
                            <div className="mb-1">
                                <p className="text-xl font-medium text-gray11">{props.service.service.serviceName}</p>

                                <div className='flex flex-row items-center gap-4 md:gap-16 pt-3 pb-3'>
                                    <div className='flex items-center justify-center gap-3'>
                                        {props.service.merchant.image ? (
                                            <Image src={props.service.merchant.image} alt="user" className="rounded-full" width={30} height={30} />
                                        ) : (
                                            <Image src={Avatar} alt="user" className="rounded-full" width={30} height={30} />
                                        )}
                                        <p className="text-gray22 text-sm font-medium">{props.service.merchant.fullName}</p>
                                    </div>

                                    {props.service.reviews.length > 0 ? (
                                        <div className='flex items-center justify-center gap-1'>
                                            <ReactStars
                                                count={1}
                                                size={18}
                                                color2={'#ffd700'}
                                                edit={false}
                                                value={1}
                                            />

                                            <p className="text-gray22 text-sm font-medium">4.5</p>
                                            <p className="text-gray20 text-sm font-light">(1,209 reviews)</p>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-center gap-1'>
                                            <ReactStars
                                                count={1}
                                                size={18}
                                                color2={'#ffd700'}
                                                edit={false}
                                                value={1}
                                            />

                                            <p className="text-gray22 text-sm font-medium">0</p>
                                            <p className="text-gray20 text-sm font-light">(0 reviews)</p>
                                        </div>
                                    )}


                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex flex-col">
                                    <div className='flex flex-col w-full'>
                                        {props.service.service.images.length > 0 ? (
                                            <div className='w-full'>
                                                {props.service.service.images.map((image: any, index: number) => (
                                                    index === 0 && (
                                                        <Image src={image.image} alt="product" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]'
                                                            width={795} height={385}
                                                            style={{
                                                                width: '795px',
                                                                height: '385px',
                                                            }}
                                                            key={index}
                                                        />
                                                    )))}
                                            </div>
                                        ) : (
                                            <div className='w-full'>
                                                <Image src={NoImage} alt="product" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]'
                                                    width={795} height={385}
                                                    style={{
                                                        width: '795px',
                                                        height: '385px',
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* service details */}
                        <div className="w-full md:w-1/3">

                            <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4">
                                <p className="text-base font-medium text-gray32 mb-1">N{formatAmount(props.service.service.pricing)}</p>
                                <p className="text-sm font-normal text-gray11">Per Service</p>
                            </div>

                            <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4 mt-[10px]">
                                <p className="text-sm font-normal text-gray11">About {props.service.merchant.fullName}</p>

                                <div className='flex items-center gap-2 mt-4 mb-2'>
                                    {props.service.merchant.image ? (
                                        <Image src={props.service.merchant.image} alt="user" className="rounded-full" width={100} height={100} />
                                    ) : (
                                        <Image src={Avatar} alt="user" className="rounded-full" width={100} height={100} />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray18 font-light">
                                            {props.service.service.serviceName}
                                        </p>
                                        <div className='flex items-center gap-2'>
                                            <Image src={Medal} alt='' />
                                            <p className="text-sm text-gray18 font-light">80% Job Success</p>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <Image src={Location3} alt='' />
                                            <p className="text-sm text-gray18 font-light">{props.service.service.location}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <p className="text-sm text-gray18 font-light">
                                        {props.service.service.description}
                                    </p>
                                </div>

                                <div className='flex items-center gap-3 flex-col'>
                                    <button className='outline-btn gap-3 text-primary3 bg-white'>
                                        <Image src={Message} alt='' />
                                        Send A Message
                                    </button>
                                    {props.loading ? (
                                        <button className="filled-btn flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                        </button>
                                    ) : (
                                        <button className='filled-btn' onClick={
                                            () => {
                                                handleRequestService()
                                            }
                                        }>
                                            Request Service
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className=''>
                        <div className="flex bg-backg2 p-3 mb-3">
                            <p className="text-base md:text-lg font-medium text-gray16">
                                Similar Services in {props.service.category.name}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {currentItems && currentItems.map((service: any, index: number) => (
                                <Link href={`/service/${service.service.serviceID}`} key={index}>
                                    <a className='hover'>
                                        <div className="w-full">
                                            {service.service.images.length > 0 ? (
                                                <>
                                                    {service.service.images.map((image: any, index: number) => (
                                                        index === 0 && (
                                                            <Image src={image.image} alt="service" className="rounded-tr-[20px] " key={index}
                                                                width={222}
                                                                height={136}
                                                            />
                                                        )
                                                    ))}
                                                </>
                                            ) : (
                                                <div className="w-full h-[136px] bg-gray23 rounded-tr-[20px]"></div>
                                            )}
                                        </div>

                                        <div className="w-full bg-backg2 rounded-br-[20px] rounded-bl-[20px] mt-[-10px]">
                                            <div className='p-2 pt-3'>
                                                <h3 className="text-sm text-primary6 font-medium mb-1">N{formatAmount(service.service.pricing)} <span className="text-xs text-primary6 font-light">per service</span></h3>
                                                <p className="text-xs font-medium text-gray22 mb-1">{service.service.serviceName}</p>
                                                <p className='text-xs font-light text-gray22 mb-1'>{shortenText(service.service.description, 90)}</p>

                                            </div>

                                            <hr className='h-[1px] border-gray24' />

                                            <div className='flex flex-row justify-between gap-2 items-center px-2 pt-3 pb-3'>
                                                <div className='flex items-center justify-center gap-1'>
                                                    <Image src={Location2} alt="location" />
                                                    <p className="text-gray22 text-xs font-light">{service.service.location}</p>
                                                </div>
                                                {service.reviews.length > 0 ? (
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <ReactStars
                                                            count={1}
                                                            size={18}
                                                            color2={'#ffd700'}
                                                            edit={false}
                                                            value={1}
                                                        />
                                                        <p className="text-gray22 text-xs font-light">4.5</p>
                                                        <p className="text-gray20 text-xs font-light">(1,209)</p>
                                                    </div>
                                                ) : (
                                                    <div className='flex items-center justify-center gap-1'>
                                                        <ReactStars
                                                            count={1}
                                                            size={18}
                                                            color2={'#ffd700'}
                                                            edit={false}
                                                            value={1}
                                                        />
                                                        <p className="text-gray22 text-xs font-light">0</p>
                                                        <p className="text-gray20 text-xs font-light">(0)</p>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </a>
                                </Link>
                            ))}

                        </div>

                        <div className='flex justify-center items-center gap-4 mt-20'>
                            <span className='text-base font-medium text-gray22'>Page</span>
                            <div className='border-[1px] border-gray23 rounded-[10px] px-8 py-2'>{currentPage}</div>
                            <span className='text-base font-medium text-gray22'>of {pages.length}</span>
                            <div className='bg-primary6 flex items-center justify-between w-[90px] py-2 px-3 rounded-[10px]'>
                                <button className={`${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                                    onClick={handlePrevBtn}
                                >
                                    <Image src={ArrowLeft} alt='' />
                                </button>
                                <button className={`${currentPage === pages[pages.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                                    onClick={handleNextBtn}
                                >
                                    <Image src={ArrowRight1} alt='' />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            }

        </>
    )
}

export default ServiceDetails