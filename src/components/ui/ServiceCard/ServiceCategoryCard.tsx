import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from '../../../assets'

interface ServiceProps {
    categoryID: string;
    name: string;
}

const ServiceCategoryCard = (props: ServiceProps) => {
    const { categoryID, name, } = props
    return (
        <>
            <Link href={`/service-category/${categoryID}`}>
                <a className="flex flex-col md:flex-row p-4 w-full bg-gray21 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] hover">
                    <div className="flex flex-col gap-4">
                        <p className="text-gray22 text-base font-medium">{name}</p>

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
        </>
    )
}

export default ServiceCategoryCard