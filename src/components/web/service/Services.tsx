import React from 'react'
import Link from 'next/link'
import ServiceCategoryCard from '../../ui/ServiceCard/ServiceCategoryCard'

const Services = ({ services }: { services: any }) => {

    return (
        <>
            {/* services */}
            <div className="mt-8">
                <h1 className="text-gray22 text-xl font-medium">Services</h1>
                <p className="text-gray22 text-base font-light">Looking for Experts? <Link href="#">
                    <a className="text-primary6 text-base font-light">Check Here</a>
                </Link>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                    {services.map((item: any, index: number) => (
                        <ServiceCategoryCard key={index} categoryID={item.categoryID} name={item.name} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Services