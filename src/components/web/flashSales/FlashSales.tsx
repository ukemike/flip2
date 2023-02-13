/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import Link from 'next/link'
import { shortenText, formatAmount } from '../../../utils/functions';


const FlashSales = ({ products }: { products: any }) => {
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
            {/* flash sales */}
            <div className="mt-8 mb-10">
                <h1 className="text-gray22 text-xl font-medium">Flash Sales</h1>

                <div className="flex flex-row mt-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        className='w-full z-0'
                    >

                        {products && products.map((product: any, index: number) => (
                            <Link href={`/product/${product.product.productID}?name=${product.product.slug}`} key={index}>
                                <a className="bg-backg2 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover">
                                    {product.product.discount && product.product.discount.isDiscountAvailable === 'Yes' && (
                                        <div className='absolute top-0 left-0 bg-red text-white text-xs font-light px-2 py-1 rounded-bl-[20px] z-10'>
                                            {product.product.discount.discountPercentage}% OFF
                                        </div>
                                    )}
                                    {product.product.images.length > 0 ? (
                                        <>
                                            {product.product.images.map((image: any, index: number) => (
                                                index === 0 && (
                                                    <Image src={image.image} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"
                                                        width={185}
                                                        height={185}
                                                        key={index}
                                                    />
                                                )
                                            ))}
                                        </>
                                    ) : (
                                        <Image src={`https://backendapi.flip.onl/storage/products/X52ZPqygvIvypo25OvYi`} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"
                                            width={185}
                                            height={185}
                                        />
                                    )}

                                    <div className="mb-1">
                                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText(product.product.name, 17)}</p>
                                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText(product.product.name, 12)}</p>


                                        {product.product.discount && product.product.discount.isDiscountAvailable === 'Yes' ? (
                                            <>
                                                <span className="text-gray22 text-xs font-medium">₦ {formatAmount(product.product.discount.discountAmount)}</span>
                                                <span className="text-gray14 text-xs font-medium line-through ml-4">₦ {formatAmount(product.product.price)}</span>
                                            </>
                                        ) : (
                                            <span className="text-gray22 text-xs font-medium">₦ {formatAmount(product.product.price)}</span>
                                        )}
                                    </div>
                                </a>
                            </Link>
                        ))}


                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default FlashSales