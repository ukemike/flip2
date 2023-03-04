/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import { Heart, Bin, EmptyCart } from '../../../assets'
import ReactStars from 'react-stars'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatAmount, shortenText } from '../../../utils/functions'


const Cart = ({ cartItems, cartLoading, removeFromCart, updateCartRemove, updateCartAdd, loadingUpdateCart, loadingFetchCart }: { cartItems: any, cartLoading: any, removeFromCart: any, updateCartRemove: any, updateCartAdd: any, loadingUpdateCart: any, loadingFetchCart: any }) => {

    const [cartID, setCartID] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (cartItems) {
            let total = 0
            cartItems.map((item: any) => {
                total = total + +item.numberOfItems
            })
            setTotalItems(total)

            let price = 0
            cartItems.map((item: any) => {
                price = price + (+item.numberOfItems * +item.product.product.discount.discountAmount)
            })
            setTotalPrice(price)
        }
    }, [cartItems])

    // handle remove from cart
    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id)
    }

    // handle update cart
    const handleUpdateCartAdd = (cartID: any, number_of_items: any,) => {
        updateCartAdd({
            cartID,
            number_of_items: number_of_items.toString()
        })
    }

    const handleUpdateCartRemove = (cartID: any, number_of_items: any) => {
        updateCartRemove({
            cartID,
            number_of_items: number_of_items.toString()
        })
    }

    return (
        <>
            {loadingFetchCart && cartItems && cartItems.length === 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div>
                    {cartItems && cartItems.length > 0 ? (
                        <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
                            <div className="w-full md:w-2/3">
                                <div className="flex bg-backg2 p-3 mb-1">
                                    <p className="text-sm font-medium text-gray16">Cart Details</p>
                                </div>

                                {cartItems && cartItems.map((item: any, index: number) => (
                                    <div className="flex flex-col gap-4 bg-gray17 p-3" key={index}>

                                        <div className="flex flex-col gap-4 border-b-2 border-gray19 mb-1">

                                            <div>
                                                <div className="flex gap-4">
                                                    <div>
                                                        <Image src={item.product.product.images[0].image} alt="product" width={100} height={100} />
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="flex flex-col gap-1">
                                                            <div className='flex md:justify-between gap-6'>
                                                                <p className="text-sm font-normal text-gray16">{shortenText(item.product.product.name, 60)}</p>
                                                                {item.product.product.discount && item.product.product.discount.isDiscountAvailable === 'Yes' ? (
                                                                    <>
                                                                        <p className="hidden md:block text-base font-medium text-gray11">₦ {formatAmount(item.product.product.discount.discountAmount)}</p>
                                                                    </>
                                                                ) : (
                                                                    <p className="hidden md:block text-base font-medium text-gray11">₦ {formatAmount(item.product.product.price)}</p>
                                                                )}
                                                            </div>

                                                            <div className='flex items-end justify-end'>
                                                                {item.product.product.discount && item.product.product.discount.isDiscountAvailable === 'Yes' ? (
                                                                    <>
                                                                        <p className="hidden md:block text-base font-medium text-gray14 line-through">₦ {formatAmount(item.product.product.price)}</p>
                                                                    </>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <p className="text-xs font-thin text-gray16">Brand:</p>
                                                                <p className="text-xs font-thin text-gray14">{item.product.product.brand}</p>
                                                            </div>

                                                            {item.product.reviews.length > 0 ? (
                                                                <div className="flex gap-2">
                                                                    {/* rating */}
                                                                    <div className="flex gap-1">
                                                                        <div className="flex items-center">
                                                                            <ReactStars
                                                                                count={5}
                                                                                size={15}
                                                                                color2={'#ffd700'}
                                                                                edit={false}
                                                                                value={4}
                                                                            />
                                                                            <Link href="/"><a className="text-xs font-thin text-primary3 ml-3">500 verified ratings</a></Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex gap-2">
                                                                    <div className="flex gap-1">
                                                                        <div className="flex items-center">
                                                                            <ReactStars
                                                                                count={5}
                                                                                size={15}
                                                                                color2={'#ffd700'}
                                                                                edit={false}
                                                                                value={0}
                                                                            />
                                                                            <p className="text-xs font-thin text-primary3 ml-3">No ratings yet</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {item.product.product.delivery.freeDelivery === "Yes" ? (
                                                                <div>
                                                                    <p className="text-xs font-light text-gray14">Free delivery to LEKKI-AJAH (SAMGOTEDO)</p>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <p className="text-xs font-light text-gray14">Delivery to LEKKI-AJAH (SAMGOTEDO) is ₦{formatAmount(item.product.product.delivery.shippingFee)}</p>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between gap-3">
                                                    <div className="flex gap-4">
                                                        <div className='flex flex-col md:flex-row md:gap-3'>

                                                            {cartLoading && item.cartID === cartID ? (
                                                                <button className="outline-btn w-[153px] mb-3">
                                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                </button>
                                                            ) : (
                                                                <button className="outline-btn w-[153px] mb-3 gap-2"
                                                                    onClick={() => {
                                                                        setCartID(item.cartID)
                                                                        handleRemoveFromCart(item.cartID)
                                                                    }
                                                                    }
                                                                >
                                                                    <Image src={Bin} alt="gen2" className="mr-2" />
                                                                    <span>Remove Item</span>
                                                                </button>
                                                            )}

                                                            <button className="outline-btn w-[153px] mb-3 gap-2">
                                                                <Image src={Heart} alt="gen2" className="mr-2" />
                                                                <span>Save for later</span>
                                                            </button>

                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-4 md:gap-0">



                                                        {item.product.product.discount && item.product.product.discount.isDiscountAvailable === 'Yes' ? (
                                                            <>
                                                                <div className='flex items-center gap-2'>
                                                                    <p className="md:hidden text-sm font-thin text-gray16">₦{formatAmount(item.product.product.discount.discountAmount)}</p>
                                                                    <p className="md:hidden text-sm font-thin text-gray14 line-through">₦{formatAmount(item.product.product.price)}</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <p className="md:hidden text-sm font-thin text-gray16">₦{formatAmount(item.product.product.price)}</p>
                                                        )}

                                                        <div className="flex flex-col">
                                                            <div className="flex justify-center items-center border-[1px] border-primary3 w-[130px] h-8 rounded-[10px]">
                                                                <div className="flex gap-6 items-center px-2">
                                                                    <button className={item.numberOfItems === 1 ? "cursor-not-allowed" : "cursor-pointer text-gray11 w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"}
                                                                        disabled={item.numberOfItems === 1 ? true : false}
                                                                        onClick={
                                                                            () => {
                                                                                setCartID(item.cartID)
                                                                                handleUpdateCartRemove(
                                                                                    item.cartID,
                                                                                    1
                                                                                )
                                                                            }
                                                                        }
                                                                    >
                                                                        <p className="text-base font-medium">-</p>
                                                                    </button>
                                                                    <p className="text-sm text-gray11  font-medium">
                                                                        {loadingUpdateCart && item.cartID === cartID ? (
                                                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                        ) : (
                                                                            item.numberOfItems
                                                                        )}
                                                                    </p>
                                                                    <button className="cursor-pointer text-gray11 w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"
                                                                        onClick={
                                                                            () => {
                                                                                setCartID(item.cartID)
                                                                                handleUpdateCartAdd(
                                                                                    item.cartID,
                                                                                    1
                                                                                )
                                                                            }
                                                                        }
                                                                    >
                                                                        <p className="text-base font-medium">+</p>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ))}

                                <div className="md:hidden flex flex-col gap-3 mt-4">
                                    <div className="">
                                        <button className="filled-btn">
                                            <Link href="/checkout">
                                                <a className="flex items-center justify-center">
                                                    Buy Now
                                                </a>
                                            </Link>
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    </div>
                                    <div className="">
                                        <Link href="/">
                                            <a className="outline-btn">
                                                Continue Shopping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3">
                                <div className="flex flex-row justify-between bg-backg2 p-3 mb-1">
                                    <p className="text-base font-thin text-gray11">Cart <span className="text-sm font-medium text-gray16">- Cart Summary</span></p>
                                    <p className="text-sm font-medium text-gray16">{totalItems} Item(s)</p>
                                </div>

                                <div className="bg-gray17 p-3">
                                    <div className='flex flex-row justify-between border-b-2 border-gray19 pb-3'>
                                        <div>
                                            <p className="text-sm font-medium text-gray11 mb-2">Subtotal:</p>
                                            <p className="text-sm font-light text-gray18">Delivery charges not included yet.</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                                    </div>

                                    <div className='flex flex-row justify-between mt-3'>
                                        <div>
                                            <p className="text-sm font-medium text-gray11 mb-2">Total:</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-row gap-3 mt-4">
                                    <div className="w-full">
                                        <Link href="/">
                                            <a className="outline-btn">
                                                Continue Shopping
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="w-full">
                                        <button className="filled-btn">
                                            <Link href="/checkout">
                                                <a className="flex items-center justify-center">
                                                    Buy Now
                                                </a>
                                            </Link>
                                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-10">
                            <Image src={EmptyCart} alt="Empty Cart" 
                            width={250} height={150}
                            />
                            <p className="text-base font-medium text-gray11 mt-4 text-center">Your cart is empty</p>
                            <p className="text-sm font-light text-gray18 mt-2 text-center">Looks like you haven't added anything to your cart yet.</p>
                            <div className="mt-4">
                                <Link href="/">
                                    <a className="outline-btn w-[200px]">
                                        Start Shopping
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Cart