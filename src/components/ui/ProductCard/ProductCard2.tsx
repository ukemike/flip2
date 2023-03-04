import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shortenText, formatAmount } from '../../../utils/functions'
import { NoImage } from '../../../assets'
import ReactStars from 'react-stars'

interface ProductProps {
    productID: string;
    slug: string;
    isDiscountAvailable: string;
    discountAmount: string;
    price: string;
    images: any[];
    name: string;
    backgroundColor: string;
    averageRating: number;
    children?: any;
}

const ProductCard2 = (props: ProductProps) => {
    const { productID, slug, isDiscountAvailable, discountAmount, price, images, name, backgroundColor, averageRating, children } = props
    return (
        <>
            <div className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover hover:bg-backg2">

                <Link href={`/product/${productID}?name=${slug}`}>
                    <a>
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
                                    <span className="text-gray22 text-xs font-medium">₦ {formatAmount(discountAmount)}</span>
                                    <span className="text-gray14 text-xs font-medium line-through ml-4">₦ {formatAmount(price)}</span>
                                </>
                            ) : (
                                <span className="text-gray22 text-xs font-medium">₦ {formatAmount(price)}</span>
                            )}


                            <div className='flex items-center gap-3'>
                                <ReactStars
                                    count={5}
                                    size={15}
                                    color2={'#ffd700'}
                                    edit={false}
                                    value={averageRating}
                                />
                                <span className='text-xs text-gray22 font-light'>{!averageRating ? ('0') : (averageRating.toFixed(1))}</span>
                            </div>

                        </div>
                    </a>
                </Link>

                {/* add children here */}
                <div>
                    {children}
                </div>

            </div>
        </>
    )
}

export default ProductCard2