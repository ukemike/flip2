import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from '../../../assets'

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
                        <Link href={`/service-category/${item.categoryID}`} key={index}>
                            <a className="flex flex-col md:flex-row p-4 w-full bg-gray21 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] hover">
                                <div className="flex flex-col gap-4">
                                    <p className="text-gray22 text-base font-medium">{item.name}</p>

                                    <div className="flex flex-row gap-20 md:gap-8 items-center">
                                        <div className="flex flex-row items-center">
                                            <Image src={Star} alt="star rating" />
                                            <p className="text-primary3 text-xs font-light ml-1">4.85/5 </p>
                                        </div>
                                        <p className="text-primary3 text-xs font-light">1853 skills</p>
                                    </div>

                                </div>
                            </a>
                        </Link>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Services