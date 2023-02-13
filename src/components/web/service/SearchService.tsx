/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { ArrowRight1, ArrowLeft, Location2 } from '../../../assets'
import Link from 'next/link'
import { shortenText, formatAmount } from '../../../utils/functions';
import ReactStars from 'react-stars'
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct';
import { useRouter } from 'next/router';
import { useState } from 'react';
const SearchService = (props: any) => {
    const router = useRouter();

    const [itemsPerPage, setItemsPerPage] = React.useState(4);
    const [minPrice, setMinPrice] = useState(props.query.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(props.query.maxPrice || '');
    const [rating, setRating] = useState(props.query.reviews || '');
    const [filteredItems, setFilteredItems] = useState(props.services || []);

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(filteredItems, itemsPerPage);

    React.useEffect(() => {
        if (props.query.rating) {
            setRating(props.query.rating || '')
        }
    }, [rating, props.query.rating])

    React.useEffect(() => {
        if (props.query.minPrice || props.query.maxPrice || props.query.rating) {
            const filterProduct = (minPrice: string, maxPrice: string, rating: string) => {
                const filteredItems = props.services.filter((item: any) => {
                    return item.service.pricing >= parseInt(minPrice) && item.service.pricing <= parseInt(maxPrice) ||
                        item.service.pricing <= parseInt(minPrice) ||
                        item.service.pricing <= parseInt(maxPrice) ||
                        item.averageRating >= parseInt(rating)

                })
                setFilteredItems(filteredItems)
            }
            filterProduct(props.query.minPrice, props.query.maxPrice, props.query.rating)
        } else {
            setFilteredItems(props.services)
        }
    }, [props.query.minPrice, props.query.maxPrice, props.query.rating, props.services])

    return (
        <>
            {props.loadingFetchServices || props.services.length < 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="pt-6">
                    {props.services && props.services.length > 0 ?
                        <div className="flex flex-col-reverse md:flex-row gap-5 pt-6">

                            {/* filter */}
                            <div className="hidden md:block md:w-1/4">
                                <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                                    <div>

                                        {/* category filter */}
                                        <div className='border-[1px] border-gray31  py-3 rounded-[10px] mb-2 h-[230px] overflow-y-auto'>
                                            <p className='text-base font-medium text-gray11 mb-3 px-3'>Category</p>
                                            {props.servicesCategories && props.servicesCategories.map((category: any, index: number) => (
                                                <Link href={`/service-category/${category.categoryID}`} key={index}>
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

                                        {/* rating filter */}
                                        <div className='border-[1px] border-gray31 px-3 py-3 rounded-[10px] mb-2 h-[200px] overflow-y-auto'>
                                            <p className='text-base font-medium text-gray11 pl-1 mb-3'>Service Rating</p>
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

                            {/* service list */}
                            <div className="w-full md:w-3/4">
                                <div className="flex bg-backg2 p-3 mb-1">
                                    <p className="text-base md:text-lg font-medium text-gray16">
                                        Showing {currentItems && currentItems.length} results for {props.query.search}
                                    </p>
                                </div>


                                <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>

                                    {currentItems && currentItems.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {currentItems && currentItems.map((service: any, index: number) => (
                                                <Link href={`/service/${service.service.serviceID}`} key={index}>
                                                    <a className='hover'>
                                                        <div className="w-full">
                                                            {service.service.images.length > 0 ? (
                                                                <>
                                                                    {service.service.images.map((image: any, index: number) => (
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
                                                                <h3 className="text-sm text-primary6 font-medium mb-1">N{formatAmount(service.service.pricing)} <span className="text-xs text-primary6 font-light">per service</span></h3>
                                                                <p className="text-xs font-medium text-gray22 mb-1">{service.service.serviceName}</p>
                                                                <p className='text-xs font-light text-gray22 mb-1'>{shortenText(service.service.description, 90)}</p>

                                                            </div>

                                                            <hr className='h-[1px] border-gray24' />

                                                            <div className='flex flex-row justify-between gap-2 items-center px-2 pt-3 pb-3'>
                                                                <div className='flex items-center justify-center gap-1'>
                                                                    <Image src={Location2} alt="location" />
                                                                    <p className="text-gray22 text-xs font-light">{service.service.location}</p>
                                                                </div>
                                                                {service.reviews.length > 0 ? (
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
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center'>
                                            <p className='text-gray22 text-base font-medium'>No Service Found</p>
                                        </div>
                                    )}

                                    {currentItems && currentItems.length > 0 && (
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
                            <p>There are no results for {props.query.search}.</p>
                            <button className='outline-btn w-48' onClick={() => router.push('/')}>Go To HomePage</button>
                        </div>
                    }

                </div>
            }
        </>
    )
}

export default SearchService