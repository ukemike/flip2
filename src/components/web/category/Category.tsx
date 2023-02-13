import React from 'react'
import { ArrowRight1, ArrowLeft } from '../../../assets'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import Link from 'next/link'
import { shortenText, formatAmount } from '../../../utils/functions';
import ReactStars from 'react-stars'
import { useRouter } from "next/router";
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct';
import { useAppSelector } from '../../../redux/hooks'
import { useState } from 'react'

const Category = (props: any) => {
    const router = useRouter()

    const { isAuthenticated } = useAppSelector((state) => state.auth)

    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [minPrice, setMinPrice] = useState(props.query.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(props.query.maxPrice || '');
    const [discount, setDiscount] = useState('');
    const [rating, setRating] = useState(props.query.reviews || '');
    const [number_of_items, setNumberOfItems] = useState(1)
    const [cartID, setCartID] = useState(0)
    const [productID, setProductID] = useState(0)
    const [cartAndProductID, setCartAndProductID] = useState([] as any)
    const [filteredItems, setFilteredItems] = useState(props.products || []);
    const [categoryName, setCategoryName] = useState('')

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(filteredItems, itemsPerPage);

    React.useEffect(() => {
        if (props.query.discount) {
            setDiscount(props.query.discount || '')
        }
    }, [props.query.discount])

    React.useEffect(() => {
        if (props.query.rating) {
            setRating(props.query.rating || '')
        }
    }, [props.query.rating])

    React.useEffect(() => {
        if (props.query.minPrice || props.query.maxPrice || props.query.discount || props.query.rating) {
            const filterProduct = (minPrice: string, maxPrice: string, rating: string, discountPercentage: string) => {
                const filteredItems = props.products.filter((item: any) => {
                    return item.product.discount.discountAmount >= parseInt(minPrice) && item.product.discount.discountAmount <= parseInt(maxPrice) ||
                        item.product.discount.discountAmount <= parseInt(minPrice) ||
                        item.product.discount.discountAmount <= parseInt(maxPrice) ||
                        item.product.discount.discountPercentage >= parseInt(discountPercentage) ||
                        item.averageRating >= parseInt(rating)

                })
                setFilteredItems(filteredItems)
            }
            filterProduct(props.query.minPrice, props.query.maxPrice, props.query.rating, props.query.discount)
        } else {
            setFilteredItems(props.products)
        }
    }, [props.query.minPrice, props.query.maxPrice, props.query.discount, props.query.rating, props.products])

    React.useEffect(() => {
        if (props.productsCategory.length > 0) {
            setCategoryName(props.productsCategory[0].name)
        }
    }, [props.productsCategory])


    // handle add to cart
    const handleAddToCart = (productID: any) => {
        if (isAuthenticated) {
            const data = {
                number_of_items: number_of_items.toString(),
                productID: productID
            }
            props.addToCart(data)
        } else {
            router.push('/login')
        }
    }

    // handle update cartadd
    const handleUpdateCartAdd = (number_of_items: any, cartID: any) => {
        props.updateCartAdd({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    // handle update cart remove
    const handleUpdateCartRemove = (number_of_items: any, cartID: any) => {
        props.updateCartRemove({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    React.useEffect(() => {
        if (props.cartItems.length > 0) {
            const cartAndProductID = props.cartItems.map((cartItem: any) => {
                return {
                    cartID: cartItem.cartID,
                    productID: cartItem.product.product.productID,
                    number_of_items: cartItem.numberOfItems
                }
            })
            setCartAndProductID(cartAndProductID)
        }
    }, [props.cartItems, props.products])

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
        <> {props.loading || props.loadingFetchProducts || props.products.length < 0 ?
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
            </div>
            :
            <div className="pt-6">

                <div className="flex flex-row items-center bg-primary4 py-2 px-4 mb-3">
                    <p className='text-white text-[18px] sm:text-xl font-medium mr-3'>Category </p>  <span className='text-white text-base font-medium'>-</span><p className='text-white text-sm sm:text-base font-medium ml-3'>{categoryName}</p>
                </div>

                <div className="flex flex-row items-center justify-between bg-gray23 py-2 px-4 mb-3">
                    <p className='text-gray22 text-base sm:text-lg font-medium'>Top {categoryName} Products</p>
                </div>

                <div className="flex flex-row mt-4 mb-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        className='w-full'
                    >
                        {props.products && props.products.map((product: any, index: number) => (
                            <Link href={`/product/${product.product.productID}`} key={index}>
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

                {props.products && props.products.length > 0 ?
                    <div className="flex flex-col-reverse md:flex-row gap-5 pt-6">

                        {/* filter */}
                        <div className="hidden md:block md:w-1/4">
                            <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                                <div>

                                    {/* category filter */}
                                    <div className='border-[1px] border-gray31  py-3 rounded-[10px] mb-2 h-[230px] overflow-y-auto'>
                                        <p className='text-base font-medium text-gray11 mb-3 px-3'>Category</p>
                                        {props.productsCategory && props.productsCategory.map((category: any, index: number) => (
                                            <Link href={`/category/${category.categoryID}`} key={index}>
                                                <a className='flex flex-row items-center mb-2 px-3 py-2 cursor-pointer hover:bg-gray31'>
                                                    <span className='text-xs text-gray11 font-medium'>{category.name}</span>
                                                </a>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* price filter */}
                                    <div className='border-[1px] border-gray31 px-3 py-3 rounded-[10px] mb-2'>
                                        <p className='text-base font-medium text-gray11 pl-2 mb-3'>Price (N)</p>
                                        <div className='flex items-center gap-4 mb-3'>

                                            <div className='flex flex-col'>
                                                <label className='text-xs font-light text-gray22'>Min</label>
                                                <input type="number" className='w-[110px] border-[1px] border-gray31 rounded-[10px] px-3 py-3 text-xs font-light text-gray11 placeholder-gray11 focus:outline-none focus:border-primary3 relative'
                                                    value={minPrice || ''}
                                                    onChange={(e: any) => setMinPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className='flex flex-col'>
                                                <label className='text-xs font-light text-gray22'>Max</label>
                                                <input type="number" className='w-[110px] border-[1px] border-gray31 rounded-[10px] px-3 py-3 text-xs font-light text-gray11 placeholder-gray11 focus:outline-none focus:border-primary3 relative'
                                                    value={maxPrice || ''}
                                                    onChange={(e: any) => setMaxPrice(e.target.value)}
                                                />
                                            </div>

                                        </div>

                                        <div className='flex items-center gap-4'>
                                            <button className={`outline-btn w-[110px] ${minPrice || maxPrice ? '' : 'opacity-20 cursor-not-allowed'}`}
                                                disabled={minPrice || maxPrice ? false : true}
                                                onClick={() => {
                                                    if ((minPrice || maxPrice)) {
                                                        setMinPrice('')
                                                        setMaxPrice('')
                                                        delete router.query.minPrice
                                                        delete router.query.maxPrice
                                                        router.push(router)
                                                    }
                                                }}
                                            >Clear</button>


                                            <button className={`filled-btn w-[110px] ${minPrice || maxPrice ? '' : 'opacity-20 cursor-not-allowed'}`}
                                                disabled={minPrice || maxPrice ? false : true}
                                                onClick={() => {
                                                    if (minPrice && maxPrice) {
                                                        router.query.minPrice = minPrice
                                                        router.query.maxPrice = maxPrice
                                                        router.push(router)
                                                    }
                                                    else if (minPrice) {
                                                        router.query.minPrice = minPrice
                                                        router.push(router)
                                                    } else if (maxPrice) {
                                                        router.query.maxPrice = maxPrice
                                                        router.push(router)
                                                    }
                                                }}
                                            >
                                                Apply
                                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                            </button>

                                        </div>
                                    </div>

                                    {/* discount filter */}
                                    <div className='border-[1px] border-gray31 px-3 py-3 rounded-[10px] mb-2 h-[200px] overflow-y-auto'>
                                        <p className='text-base font-medium text-gray11 pl-1 mb-3'>Discount Percentage</p>
                                        <form>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='discount' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={50}
                                                    onChange={(e: any) => {
                                                        router.query.discount = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={discount === '50' ? true : false}
                                                />
                                                <label className='text-sm font-medium text-gray11'>50% or more</label>
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='discount' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={40}
                                                    onChange={(e: any) => {
                                                        router.query.discount = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={discount === '40' ? true : false}
                                                />
                                                <label className='text-sm font-medium text-gray11'>40% or more</label>
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='discount' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={30}
                                                    onChange={(e: any) => {
                                                        router.query.discount = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={discount === '30' ? true : false}
                                                />
                                                <label className='text-sm font-medium text-gray11'>30% or more</label>
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='discount' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={20}
                                                    onChange={(e: any) => {
                                                        router.query.discount = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={discount === '20' ? true : false}
                                                />
                                                <label className='text-sm font-medium text-gray11'>20% or more</label>
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='discount' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={10}
                                                    onChange={(e: any) => {
                                                        router.query.discount = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={discount === '10' ? true : false}
                                                />
                                                <label className='text-sm font-medium text-gray11'>10% or more</label>
                                            </div>
                                            <div className='flex flex-row justify-end'>
                                                <button type='button' className={`text-sm text-primary6 font-light ${discount ? '' : 'opacity-40 cursor-not-allowed'}`}
                                                    disabled={discount ? false : true}
                                                    onClick={() => {
                                                        if (props.query.discount) {
                                                            setDiscount('')
                                                            delete router.query.discount
                                                            router.push(router)
                                                        }
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* rating filter */}
                                    <div className='border-[1px] border-gray31 px-3 py-3 rounded-[10px] mb-2 h-[200px] overflow-y-auto'>
                                        <p className='text-base font-medium text-gray11 pl-1 mb-3'>Product Rating</p>
                                        <form>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='rating' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={5}
                                                    onChange={(e: any) => {
                                                        router.query.rating = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={rating === '5' ? true : false}
                                                />
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    color2={'#ffd700'}
                                                    edit={false}
                                                    value={5}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='rating' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={4}
                                                    onChange={(e: any) => {
                                                        router.query.rating = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={rating === '4' ? true : false}
                                                />
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    color2={'#ffd700'}
                                                    edit={false}
                                                    value={4}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='rating' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={3}
                                                    onChange={(e: any) => {
                                                        router.query.rating = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={rating === '3' ? true : false}
                                                />
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    color2={'#ffd700'}
                                                    edit={false}
                                                    value={3}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='rating' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={2}
                                                    onChange={(e: any) => {
                                                        router.query.rating = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={rating === '2' ? true : false}
                                                />
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    color2={'#ffd700'}
                                                    edit={true}
                                                    value={2}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center gap-3 mb-4'>
                                                <input type="radio" name='rating' className='w-[20px] h-[20px] border-[1px] cursor-pointer'
                                                    value={1}
                                                    onChange={(e: any) => {
                                                        router.query.rating = e.target.value
                                                        router.push(router)
                                                    }}
                                                    checked={rating === '1' ? true : false}
                                                />
                                                <ReactStars
                                                    count={5}
                                                    size={20}
                                                    color2={'#ffd700'}
                                                    edit={false}
                                                    value={1}
                                                />
                                            </div>
                                            <div className='flex flex-row justify-end'>
                                                <button type='button' className={`text-sm text-primary6 font-light ${rating ? '' : 'opacity-40 cursor-not-allowed'}`}
                                                    disabled={rating ? false : true}
                                                    onClick={() => {
                                                        if (props.query.rating) {
                                                            setRating('')
                                                            delete router.query.rating
                                                            router.push(router)
                                                        }
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* products */}
                        <div className="w-full md:w-3/4">
                            <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                                {currentItems && currentItems.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {currentItems && currentItems.map((product: any, index: number) => (
                                            <div key={index} className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-2 relative mr-2 flex flex-col gap-2 hover hover:bg-backg2">

                                                {product.product.discount && product.product.discount.isDiscountAvailable === 'Yes' && (
                                                    <div className='absolute top-0 left-0 bg-red text-white text-xs font-light px-2 py-1 rounded-bl-[20px] z-10'>
                                                        {product.product.discount.discountPercentage}% OFF
                                                    </div>
                                                )}

                                                <Link href={`/product/${product.product.productID}`}>
                                                    <a>
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
                                                            <p className="hidden md:block text-gray22 text-sm font-medium">{shortenText(product.product.name, 19)}</p>
                                                            <p className="md:hidden text-gray22 text-sm font-medium">{shortenText(product.product.name, 12)}</p>
                                                            {product.product.discount && product.product.discount.isDiscountAvailable === 'Yes' ? (
                                                                <>
                                                                    <span className="text-gray22 text-sm font-medium">₦ {formatAmount(product.product.discount.discountAmount)}</span>
                                                                    <span className="text-gray14 text-sm font-medium line-through ml-4">₦ {formatAmount(product.product.price)}</span>
                                                                </>
                                                            ) : (
                                                                <span className="text-gray22 text-sm font-medium">₦ {formatAmount(product.product.price)}</span>
                                                            )}
                                                            <div className='flex items-center gap-3'>
                                                                <ReactStars
                                                                    count={5}
                                                                    size={15}
                                                                    color2={'#ffd700'}
                                                                    edit={false}
                                                                    value={product.averageRating}
                                                                />
                                                                <span className='text-xs text-gray22 font-light'>{
                                                                    !product.averageRating ? (
                                                                        '0'
                                                                    ) : (
                                                                        product.averageRating.toFixed(1)
                                                                    )
                                                                }</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>

                                                {cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                    item.productID === product.product.productID).length > 0 ? (
                                                    <div className="flex fex-row items-center gap-3 py-4">
                                                        <div className="flex justify-center items-center border-[1px] border-primary3 w-full h-8 rounded-[10px]">
                                                            <div className="flex gap-6 items-center px-2">
                                                                <button className={cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                                    item.productID === product.product.productID)[0].number_of_items === 1 ? "cursor-not-allowed" : "text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"} disabled={cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                                        item.productID === product.product.productID)[0].number_of_items === 1 ? true : false} onClick={
                                                                            () => {
                                                                                setCartID(cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                                handleUpdateCartRemove(
                                                                                    1, cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID
                                                                                )
                                                                            }
                                                                        }>
                                                                    <p className="text-base font-medium">-</p>
                                                                </button>
                                                                {props.loadingUpdateCart && cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID === cartID ? (
                                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                ) : (
                                                                    <p className="text-sm font-medium text-gray11">{
                                                                        cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                                            item.productID === product.product.productID)[0].number_of_items
                                                                    }</p>
                                                                )}

                                                                <button className="text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white" onClick={
                                                                    () => {
                                                                        setCartID(cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                        handleUpdateCartAdd(
                                                                            1, cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID
                                                                        )
                                                                    }
                                                                }>
                                                                    <p className="text-base font-medium">+</p>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-row gap-3 mt-4 w-full">
                                                        <div className="w-full">

                                                            {props.cartLoading && product.product.productID === productID ? (
                                                                <button className="outline-btn">
                                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                </button>
                                                            ) : (
                                                                <button className="filled-btn" onClick={
                                                                    () => {
                                                                        setProductID(product.product.productID)
                                                                        handleAddToCart(product.product.productID)
                                                                    }
                                                                }>
                                                                    Add To Cart
                                                                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                                </button>
                                                            )}

                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center'>
                                        <p className='text-gray22 text-base font-medium'>No Product Found</p>
                                    </div>
                                )}

                                {currentItems.length > 0 && (
                                    <div className='flex justify-center items-center gap-4 mt-20'>
                                        <span className='text-base font-medium text-gray22'>Page</span>
                                        <div className='border-[1px] border-gray23 rounded-[10px] px-8 py-2'>{currentPage}</div>
                                        <span className='text-base font-medium text-gray22'>of {pages.length}</span>
                                        <div className='bg-primary6 flex items-center justify-between w-[90px] py-2 px-3 rounded-[10px]'>
                                            <button className={`${currentPage === pages[0] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                                                onClick={handlePrevBtn}
                                            >
                                                <Image src={ArrowLeft} alt='' />
                                            </button>
                                            <button className={`${currentPage === pages[pages.length - 1] ? 'cursor-auto pointer-events-none opacity-50' : ''}`}
                                                onClick={handleNextBtn}
                                            >
                                                <Image src={ArrowRight1} alt='' />
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                    :
                    <div className='flex flex-col gap-4 items-center justify-center w-full h-full pt-4 pb-4'>
                        <p>No products found</p>
                        <button className='outline-btn w-48' onClick={() => router.push('/')}>Go To HomePage</button>
                    </div>
                }
            </div>
        }
        </>
    )
}

export default Category