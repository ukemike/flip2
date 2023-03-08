import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shortenText, formatAmount } from '../../../utils/functions'
import { NoImage } from '../../../assets'

interface ProductProps {
    productID: string;
    slug: string;
    isDiscountAvailable: string;
    discountAmount: string;
    price: string;
    images: any[];
    name: string;
    backgroundColor: string;
}

const ProductCard = (props: ProductProps) => {

    const { productID, slug, isDiscountAvailable, discountAmount, price, images, name, backgroundColor } = props

    return (
        <>
            <Link href={`/product/${productID}?name=${slug}`} >
                <a className={`bg-${backgroundColor} rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover`}>

                    {isDiscountAvailable === 'Yes' && (
                        <div className='absolute top-2 left-2 bg-red5 text-white text-xs font-medium px-2 py-1 z-10'>
                            Save {Math.floor((+price - +discountAmount) / +price * 100)}%
                        </div>
                    )}

                    {images.length > 0 ? (
                        <>
                            {images.map((image: any, index: number) => (
                                index === 0 && (
                                    <Image src={image.image} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} key={index} />
                                )
                            ))}
                        </>
                    ) : (
                        <Image src={NoImage} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={185} height={185} />
                    )}

                    <div className="mb-1">
                        <p className="hidden md:block text-gray30 text-sm font-medium">{shortenText(name, 17)}</p>
                        <p className="md:hidden text-gray30 text-sm font-medium">{shortenText(name, 12)}</p>

                        {isDiscountAvailable === 'Yes' ? (
                            <>
                                <p className="text-gray22 text-xs font-medium">₦ {formatAmount(discountAmount)}</p>
                                <p className="text-gray14 text-xs font-medium line-through mt-1">₦ {formatAmount(price)}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray22 text-xs font-normal pb-5">₦ {formatAmount(price)}</p>
                            </>
                        )}

                    </div>
                </a>
            </Link>
        </>
    )
}

export default ProductCard