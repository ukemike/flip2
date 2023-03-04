/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Clip } from '../../../assets'
import { useRouter } from 'next/router';
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct';
import { useState } from 'react'
import ServiceCard from '../../ui/ServiceCard';
import Pagination from '../../ui/Pagination'
import ServiceFilter from '../../ui/Filter/ServiceFilter'

const Service = (props: any) => {
    const router = useRouter();

    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(props.services, itemsPerPage);


    return (
        <>
            {props.loadingFetchServices || props.services.length < 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center rounded-[20px] p-4 border-[1px] border-primary3">
                        <div className="flex flex-col gap-4 mb-8 md:mb-0">
                            <h1 className="text-gray22 text-lg md:text-[24px] font-medium">Good barbers, like good friends, are hard to find… <br /> but not impossible</h1>
                            <p className="text-gray22 text-base md:text-lg font-normal">Hire the best barbers for your hair treatment</p>
                        </div>

                        <div className="relative">
                            <Image src={Clip} alt="featured product" />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-5 pt-6">
                        {/* filter */}
                        <div className="hidden md:block md:w-1/4">
                            <ServiceFilter
                                servicesCategories={props.servicesCategories}
                                query={props.query}
                            />
                        </div>

                        {/* service list */}
                        {props.services && props.services.length > 0 ?
                            <div className="w-full md:w-3/4">
                                <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                                    {currentItems && currentItems.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {currentItems && currentItems.map((service: any, index: number) => (
                                                <ServiceCard
                                                    serviceID={service.service.serviceID}
                                                    serviceName={service.service.serviceName}
                                                    pricing={service.service.pricing}
                                                    description={service.service.description}
                                                    location={service.service.location}
                                                    images={service.service.images}
                                                    reviews={service.reviews}
                                                    key={index}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center'>
                                            <p className='text-gray22 text-base font-medium'>No Service Found</p>
                                        </div>
                                    )}

                                    {currentItems && currentItems.length > 0 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            pages={pages}
                                            handlePrevBtn={handlePrevBtn}
                                            handleNextBtn={handleNextBtn}
                                        />
                                    )}

                                </div>

                            </div>
                            :
                            <div className='flex flex-col gap-4 items-center justify-center w-full h-full pt-4 pb-4'>
                                <p>No service found</p>
                                <button className='outline-btn w-48' onClick={() => router.push('/')}>Go To HomePage</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Service