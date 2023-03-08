import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Location2 } from '../../../assets'
import { shortenText, formatAmount } from '../../../utils/functions';
import ReactStars from 'react-stars'


interface ServiceProps {
    serviceID: string;
    serviceName: string;
    pricing: string;
    description: string;
    location: string;
    images: any[];
    reviews: any[];
}

const ServiceCard = (props: ServiceProps) => {
    const { serviceID, serviceName, pricing, description, location, images, reviews } = props
    return (
        <>
            <Link href={`/service/${serviceID}`} >
                <a className='hover'>
                    <div className="w-full">
                        {images.length > 0 ? (
                            <>
                                {images.map((image: any, index: number) => (
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
                            <h3 className="text-sm text-primary6 font-medium mb-1">N{formatAmount(pricing)} <span className="text-xs text-primary6 font-light">per service</span></h3>
                            <p className="text-xs font-medium text-gray22 mb-1">{serviceName}</p>
                            <p className='text-xs font-light text-gray22 mb-1'>{shortenText(description, 90)}</p>

                        </div>

                        <hr className='h-[1px] border-gray24' />

                        <div className='flex flex-row justify-between gap-2 items-center px-2 pt-3 pb-3'>
                            <div className='flex items-center justify-center gap-1'>
                                <Image src={Location2} alt="location" />
                                <p className="text-gray22 text-xs font-light">{location}</p>
                            </div>
                            {reviews.length > 0 ? (
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
        </>
    )
}

export default ServiceCard