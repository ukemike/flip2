/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct';
import { useRouter } from 'next/router';
import ServiceCard from '../../ui/ServiceCard';
import Pagination from '../../ui/Pagination'
import ServiceFilter from '../../ui/Filter/ServiceFilter'

const SearchService = (props: any) => {
    const router = useRouter();

    const [itemsPerPage, setItemsPerPage] = React.useState(4);

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(props.services, itemsPerPage);

    return (
        <>
            {props.loadingFetchServices || props.services.length < 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="pt-6">
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
                                <div className="flex bg-backg2 p-3 mb-1">
                                    <p className="text-base md:text-lg font-medium text-gray16">
                                        Showing {currentItems && currentItems.length} results for {props.query.search}
                                    </p>
                                </div>


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
                                <p>There are no results for {props.query.search}.</p>
                                <button className='outline-btn w-48' onClick={() => router.push('/')}>Go To HomePage</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SearchService