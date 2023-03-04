import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Delivery, Policy, Warranty, Details, Spec, Feedback } from '../../../assets'
import { useState } from 'react'
import ReactStars from 'react-stars'
import { formatAmount } from '../../../utils/functions'
import { useAppSelector } from '../../../redux/hooks'
import { useRouter } from 'next/router'
import { FaComments } from 'react-icons/fa'

const SingleProduct = (props: any) => {

    const router = useRouter()

    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const [number_of_items, setNumberOfItems] = useState(1)
    const [images, setImages] = useState([] as any)
    const [mainImage, setMainImage] = useState('' as any)
    const scrollToProductDetails = React.useRef({} as any);
    const scrollToProductSpec = React.useRef({} as any);
    const scrollToProductFeedback = React.useRef({} as any);
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [cartID, setCartID] = useState('')

    // when the page loads for the first time setIsAddedToCart false
    React.useEffect(() => {
        setIsAddedToCart(false)
    }, [])

    // handle add to cart
    const handleAddToCart = (e: any) => {
        e.preventDefault()
        if (isAuthenticated) {
            const data = {
                number_of_items: number_of_items.toString(),
                productID: props.product.product.productID,
            }
            props.addToCart(data)
        } else {
            router.push('/login')
        }
    }

    // handle update cartadd
    const handleUpdateCartAdd = (number_of_items: any) => {
        props.updateCartAdd({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    // handle update cart remove
    const handleUpdateCartRemove = (number_of_items: any) => {
        props.updateCartRemove({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    const handleScrollToProductDetails = () => {
        scrollToProductDetails.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }

    const handleScrollToProductSpec = () => {
        scrollToProductSpec.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }

    const handleScrollToProductFeedback = () => {
        scrollToProductFeedback.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }

    React.useEffect(() => {
        if (Object.keys(props.product).length > 0) {
            setImages(props?.product?.product?.images)
            setMainImage(props?.product?.product?.images[0]?.image)
        }
    }, [props.product, images])

    const changeMainImage = (image: any) => {
        setMainImage(image)
    }

    React.useEffect(() => {
        if (props.cartItems && props.cartItems.length > 0) {
            const cartItem = props.cartItems.find((item: any) => item?.product?.product?.productID === props?.product?.product?.productID)
            if (cartItem && cartItem?.product?.product?.productID === props?.product.product?.productID) {
                setIsAddedToCart(true)
                setCartID(cartItem?.cartID)
                setNumberOfItems(cartItem?.numberOfItems)
            } else {
                setIsAddedToCart(false)
                setNumberOfItems(1)
                setCartID('')
            }
        }
    }, [props.cartItems, props.product])


    return (
        <>
            {props.loadingFetchProducts || Object.keys(props.product).length === 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="flex flex-col md:flex-row gap-4 pt-6">

                    <div className="w-full md:w-2/3">

                        <div className="flex bg-backg2 p-4 mb-1 rounded-md">
                            <p className="text-base font-medium text-gray16">{props.product.product.name}</p>
                        </div>

                        <div className="flex flex-col gap-4 bg-gray17 p-4 mb-4">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                <div className='flex flex-col'>
                                    <div>
                                        <Image src={mainImage} alt="product-image" width={400} height={400} />
                                    </div>

                                    <div className="flex flex-row gap-2 mt-2">
                                        {images.map((image: any, index: any) => (
                                            <div className="w-16 h-16 cursor-pointer" key={index} onClick={() => changeMainImage(image.image)}>
                                                <Image src={image.image} alt="product-images" width={100} height={100} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className='border-b-2 border-gray19 pb-6'>
                                        <p className="text-base font-medium text-gray16 mb-1">{props.product.product.name}</p>

                                        <p className="text-xs font-light text-gray18 mb-1">Brand : <span>{props.product.product.brand}</span></p>

                                        {props.product.reviews && props.product.reviews.length > 0 ? (
                                            <div className="flex gap-1 mb-1">
                                                <div className="flex items-center">
                                                    <ReactStars
                                                        count={5}
                                                        size={15}
                                                        color2={'#ffd700'}
                                                        edit={false}
                                                        value={props.productStat.average}
                                                    />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3 ml-3">{props.product.reviews.length} verified ratings</a></Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1 mb-1">
                                                <div className="flex items-center">
                                                    <ReactStars
                                                        count={5}
                                                        size={15}
                                                        color2={'#ffd700'}
                                                        edit={false}
                                                        value={0}
                                                    />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3 ml-3">No ratings yet</a></Link>
                                                </div>
                                            </div>
                                        )}

                                        {props.product.product.delivery.freeDelivery === 'Yes' ? (
                                            <p className="text-xs font-light text-gray14">Free delivery to LEKKI-AJAH (SAMGOTEDO)</p>
                                        ) : (
                                            <p className="text-xs font-light text-gray14">Delivery to LEKKI-AJAH (SAMGOTEDO) is NGN {props.product.product.delivery.shippingFee}</p>
                                        )}
                                    </div>

                                    <div className="border-b-2 border-gray19 py-4 flex items-center gap-4">
                                        {props.product.product.discount && props.product.product.discount.isDiscountAvailable === 'Yes' ? (
                                            <>
                                                <p className="text-lg font-medium text-gray11">N{formatAmount(props.product.product.discount.discountAmount)}</p>
                                                <p className="text-lg font-medium text-gray14 line-through">N{formatAmount(props.product.product.price)}</p>
                                            </>
                                        ) : (
                                            <p className="text-lg font-medium text-gray11">N{formatAmount(props.product.product.discount.discountAmount)}</p>
                                        )}


                                    </div>

                                    {isAddedToCart && (
                                        <div className="flex fex-row items-center gap-3 border-b-2 border-gray19 py-4">
                                            <p className="font-light text-[10px]">Quantity:</p>
                                            <div className="flex justify-center items-center border-[1px] border-primary3 w-[130px] h-8 rounded-[10px]">
                                                <div className="flex gap-6 items-center px-2">
                                                    <button className={number_of_items === 1 ? "cursor-not-allowed" : "text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"} disabled={number_of_items === 1 ? true : false}
                                                        onClick={
                                                            () => {
                                                                handleUpdateCartRemove(1)
                                                            }
                                                        }>
                                                        <p className="text-base font-medium">-</p>
                                                    </button>
                                                    {props.loadingUpdateCart ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                    ) : (
                                                        <p className="text-sm font-medium text-gray11">{number_of_items}</p>
                                                    )}

                                                    <button className="text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white" onClick={
                                                        () => {
                                                            handleUpdateCartAdd(1)
                                                        }
                                                    }>
                                                        <p className="text-base font-medium">+</p>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="font-light text-[10px]">({number_of_items} item (s) added)</p>
                                        </div>
                                    )}

                                    {!isAddedToCart && (
                                        <div className="flex flex-row gap-3 mt-4 w-full">
                                            <div className="w-full">

                                                {props.cartLoading ? (
                                                    <button className="outline-btn">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                    </button>
                                                ) : (
                                                    <button className="filled-btn" onClick={handleAddToCart}>
                                                        Add To Cart
                                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>

                        <div ref={scrollToProductDetails}>
                            <div className="flex bg-backg2 p-4 mb-1">
                                <p className="text-base font-medium text-gray16">Product Details</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-4 mb-4">
                                <div className='font-light text-xs text-gray18 mb-3'>
                                    <p>
                                        {props.product.product.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={scrollToProductSpec}>
                            <div className="flex bg-backg2 p-4 mb-1">
                                <p className="text-base font-medium text-gray16">Specification</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-4 mb-4">

                                <div>
                                    <p className='font-medium text-sm text-gray16 mb-3'>Key Features:</p>

                                    <div className='font-light text-sm text-gray18'>

                                        <ul className="list-decimal ml-4">
                                            {props.product.product.features && props.product.product.features.map((feature: any, index: number) => (
                                                <li className="mb-[2px]" key={index}>{feature.featureName}</li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                                <div>
                                    <p className='font-medium text-sm text-gray16 mb-3'>Specifications:</p>

                                    <div className='font-light text-sm text-gray18'>

                                        <ul className="list-decimal ml-4">
                                            {props.product.product.specifications && props.product.product.specifications.map((specification: any, index: number) => (
                                                <li className="mb-[2px]" key={index}><span className='text-xs font-medium capitalize'>{specification.title}</span> : <span className='text-xs font-light'>{specification.value}</span></li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div ref={scrollToProductFeedback}>
                            <div className="flex bg-backg2 p-4 mb-1">
                                <p className="text-base font-medium text-gray16">Customer Feedback</p>
                            </div>
                            {props.product.reviews && props.product.reviews.length > 0 ? (
                                <div className="flex flex-col gap-4 bg-gray17 p-4">
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-4">

                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <p className="text-[12px] font-medium text-gray16 mb-1">Verified Ratings ({props.product.reviews.length})</p>
                                                <div className='bg-gray21 flex flex-col items-center p-5 w-40'>

                                                    <p className="text-[20px] font-medium text-gray16"> {props?.productStat?.average?.toFixed(1)}</p>
                                                    <ReactStars
                                                        count={5}
                                                        size={15}
                                                        color2={'#ffd700'}
                                                        edit={false}
                                                        value={props.productStat.average}
                                                    />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">{props.product.reviews.length} verified ratings</a></Link>

                                                </div>
                                            </div>

                                            <div className='flex flex-row items-center gap-3'>
                                                <p className="text-xs font-medium text-gray16">5</p>

                                                <div className='flex flex-row items-center gap-1'>
                                                    <Image src={Star} width={15} height={15} alt='star' />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">({props.productStat.noOfFive})</a></Link>
                                                </div>

                                                <div className='bg-gray21 w-[100px] h-1'>
                                                    <div className='bg-yellow w-[80px] h-[4px] rounded-[20px]'></div>
                                                </div>
                                            </div>

                                            <div className='flex flex-row items-center gap-3'>
                                                <p className="text-xs font-medium text-gray16">4</p>

                                                <div className='flex flex-row items-center gap-1'>
                                                    <Image src={Star} width={15} height={15} alt='star' />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">({props.productStat.noOfFour})</a></Link>
                                                </div>

                                                <div className='bg-gray21 w-[100px] h-1'>
                                                    <div className='bg-yellow w-[70px] h-[4px] rounded-[20px]'></div>
                                                </div>
                                            </div>

                                            <div className='flex flex-row items-center gap-3'>
                                                <p className="text-xs font-medium text-gray16">3</p>

                                                <div className='flex flex-row items-center gap-1'>
                                                    <Image src={Star} width={15} height={15} alt='star' />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">({props.productStat.noOfThree})</a></Link>
                                                </div>

                                                <div className='bg-gray21 w-[100px] h-1'>
                                                    <div className='bg-yellow w-[60px] h-[4px] rounded-[20px]'></div>
                                                </div>
                                            </div>

                                            <div className='flex flex-row items-center gap-3'>
                                                <p className="text-xs font-medium text-gray16">2</p>

                                                <div className='flex flex-row items-center gap-1'>
                                                    <Image src={Star} width={15} height={15} alt='star' />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">({props.productStat.noOfTwo})</a></Link>
                                                </div>

                                                <div className='bg-gray21 w-[100px] h-1'>
                                                    <div className='bg-yellow w-[50px] h-[4px] rounded-[20px]'></div>
                                                </div>
                                            </div>

                                            <div className='flex flex-row items-center gap-3'>
                                                <p className="text-xs font-medium text-gray16">1</p>

                                                <div className='flex flex-row items-center gap-1'>
                                                    <Image src={Star} width={15} height={15} alt='star' />
                                                    <Link href="#"><a className="text-xs font-thin text-primary3">({props.productStat.noOfOne})</a></Link>
                                                </div>

                                                <div className='bg-gray21 w-[100px] h-1'>
                                                    <div className='bg-yellow w-[40px] h-[4px] rounded-[20px]'></div>
                                                </div>
                                            </div>



                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <p className="text-[12px] font-medium text-gray16 mb-1">Comments From Verified Purchases</p>

                                            <div className='flex flex-col gap-2'>
                                                {props.product.reviews && props.product.reviews.map((review: any, index: number) => (
                                                    <div key={index}>
                                                        <ReactStars
                                                            count={5}
                                                            size={15}
                                                            color2={'#ffd700'}
                                                            edit={false}
                                                            value={review.rating}
                                                        />
                                                        <p className="text-[12px] font-medium text-gray18 mb-1">{review.reviewerName}</p>
                                                        <span className="text-[10px] font-light text-gray14 mb-1">
                                                            {review.review}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-3 mt-3 items-center justify-center'>
                                    <FaComments className='text-gray22 text-[80px]' />
                                    <p className="text-[12px] font-medium text-gray16 ml-1">No Reviews Yet</p>
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="w-full md:w-1/3">
                        <div className="flex bg-backg2 p-4 mb-1 rounded-md">
                            <p className="text-base font-medium text-gray16">Delivery & Returns</p>
                        </div>

                        <div className="p-4 mb-4">
                            <div className="flex flex-row items-baseline gap-2 border-b-2 border-b-gray19 pb-2 mb-4">
                                <Image src={Delivery} alt='delivery' />
                                <div>
                                    <p className="text-xs font-medium text-gray11 mb-1">Delivery</p>
                                    <p className="text-xs font-light text-gray18 mb-1">Estimated delivery time 1-9 business days</p>
                                </div>
                            </div>

                            <div className="flex flex-row items-baseline gap-2 border-b-2 border-b-gray19 pb-2 mb-4">
                                <Image src={Policy} alt='policy' width={30} height={30} />
                                <div>
                                    <p className="text-xs font-medium text-gray11 mb-1">Return Policy</p>
                                    <p className="text-xs font-light text-gray18 mb-1">No returns or exchange for this items.
                                        Free returns within 15 days for Official store items and 7 days for other eligible items.</p>
                                </div>
                            </div>

                            <div className="flex flex-row items-baseline gap-2 border-b-2 border-b-gray19 pb-2 mb-4">
                                <Image src={Warranty} alt='warranty' />
                                <div>
                                    <p className="text-xs font-medium text-gray11 mb-1">Warranty</p>
                                    <p className="text-xs font-light text-gray18 mb-1">Warranty information unavailable for this item.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='sticky top-40'>
                            <div className="flex bg-backg2 p-4 mb-1 rounded-md">
                                <p className="text-base font-medium text-gray16">Seller Information</p>
                            </div>

                            <div>
                                <div className={`flex flex-row items-center justify-start gap-4 border-[1px] border-gray19 p-4 mb-2 h-[50px] cursor-pointer hover:bg-gray21`}
                                    onClick={handleScrollToProductDetails}
                                >
                                    <Image src={Details} alt='info' />
                                    <p className="text-xs font-medium text-gray11 mb-1">Product Details</p>
                                </div>

                                <div className={`flex flex-row items-center justify-start gap-4 border-[1px] border-gray19 p-4 mb-2 h-[50px] cursor-pointer hover:bg-gray21`}
                                    onClick={handleScrollToProductSpec}
                                >
                                    <Image src={Spec} alt='specification' />
                                    <p className="text-xs font-medium text-gray11 mb-1">Specification</p>
                                </div>

                                <div className={`flex flex-row items-center justify-start gap-4 border-[1px] border-gray19 p-4 mb-2 h-[50px] cursor-pointer hover:bg-gray21`}
                                    onClick={handleScrollToProductFeedback}
                                >
                                    <Image src={Feedback} alt='feedback' />
                                    <p className="text-xs font-medium text-gray11 mb-1">Customer Feedback</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default SingleProduct