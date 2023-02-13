import React from 'react'
import { Gen2, Phone, Phone1, Phone2, Phone3, Phone4, Phone5 } from '../../../assets'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import Link from 'next/link'
import { shortenText, formatAmount } from '../../../utils/functions';

const Recent = () => {
    const responsive2 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            partialVisibilityGutter: 15
        }
    };
    return (
        <>
            <div className="mt-8 mb-10">
                <h1 className="text-gray22 text-xl font-medium">Recently Viewed</h1>

                <div className="flex flex-row mt-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        className='w-full z-0'
                    >

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone1} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone2} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone3} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone4} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone5} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone4} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone5} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>

                            <Link href={`/product/1`}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    <Image src={Phone3} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 20)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText('Infinix Note10', 15)}</p>
                                        <span className="text-gray22 text-xs font-medium">₦ {formatAmount(10000)}</span>
                                    </div>
                                </a>
                            </Link>


                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Recent