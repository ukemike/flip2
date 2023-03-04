import React from 'react'
import Image from 'next/image'
import { Avatar, NoImage } from '../../../assets'
import ReactStars from 'react-stars'

interface ServiceImageProps {
    serviceName: string;
    image: string;
    fullName: string;
    reviews: any[];
    images: any[];
}

const ServiceImage = (props: ServiceImageProps) => {
    const { serviceName, image, fullName, reviews, images } = props
    return (
        <>
            <div className="w-full md:w-2/3">
                <div className="mb-1">
                    <p className="text-xl font-medium text-gray11">{serviceName}</p>

                    <div className='flex flex-row items-center gap-4 md:gap-16 pt-3 pb-3'>
                        <div className='flex items-center justify-center gap-3'>
                            {image ? (
                                <Image src={image} alt="user" className="rounded-full" width={30} height={30} />
                            ) : (
                                <Image src={Avatar} alt="user" className="rounded-full" width={30} height={30} />
                            )}
                            <p className="text-gray22 text-sm font-medium">{fullName}</p>
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
                            {images.length > 0 ? (
                                <div className='w-full'>
                                    {images.map((image: any, index: number) => (
                                        index === 0 && (
                                            <Image src={image.image} alt="product" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]' width={795} height={385} style={{ width: '795px', height: '385px', }} key={index} />
                                        )))}
                                </div>
                            ) : (
                                <div className='w-full'>
                                    <Image src={NoImage} alt="product" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]' width={795} height={385} style={{ width: '795px', height: '385px', }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceImage