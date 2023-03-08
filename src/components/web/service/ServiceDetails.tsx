/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct'
import ServiceCard from '../../ui/ServiceCard';
import Pagination from '../../ui/Pagination'
import ServiceImage from '../../ui/ServiceDetail/ServiceImage'
import ServiceInfo from '../../ui/ServiceDetail/ServiceInfo'


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
                        <ServiceImage
                            serviceName={props.service.service.serviceName}
                            image={props.service.merchant.image}
                            fullName={props.service.merchant.fullName}
                            reviews={props.service.reviews}
                            images={props.service.service.images}
                        />

                        <ServiceInfo
                            pricing={props.service.service.pricing}
                            fullName={props.service.merchant.fullName}
                            userID={props.service.merchant.userID}
                            image={props.service.merchant.image}
                            serviceName={props.service.service.serviceName}
                            location={props.service.service.location}
                            description={props.service.service.description}
                            loading={props.loading}
                            handleRequestService={handleRequestService}
                            sendMesage={props.sendMesage}
                            loadingChatMessage={props.loadingChatMessage}
                        />

                    </div>

                    <div className=''>
                        <div className="flex bg-backg2 p-3 mb-3">
                            <p className="text-base md:text-lg font-medium text-gray16">
                                Similar Services in {props.service.category.name}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
            }

        </>
    )
}

export default ServiceDetails