import React from 'react'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { useRouter } from "next/router";
import { useState } from 'react'

interface ProductFilterProps {
    productsCategory: any[];
    query: any;
}



const ProductFilter = (props: ProductFilterProps) => {
    const router = useRouter()

    const { productsCategory, query } = props;

    const [minPrice, setMinPrice] = useState(query.priceRange ? query.priceRange.split('-')[0] : '');
    const [maxPrice, setMaxPrice] = useState(query.priceRange ? query.priceRange.split('-')[1] : '');
    const [discount, setDiscount] = useState('');
    const [rating, setRating] = useState(query.rating || '');


    React.useEffect(() => {
        if (query.discountPercentage) {
            setDiscount(query.discountPercentage || '')
        }
    }, [query.discountPercentage])

    React.useEffect(() => {
        if (query.rating) {
            setRating(query.rating || '')
        }
    }, [query.rating])

    return (
        <>
            <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                <div>

                    {/* category filter */}
                    <div className='border-[1px] border-gray31  py-3 rounded-[10px] mb-2 h-[230px] overflow-y-auto'>
                        <p className='text-base font-medium text-gray11 mb-3 px-3'>Category</p>
                        {productsCategory && productsCategory.map((category: any, index: number) => (
                            <Link href={`/category/${category.categoryID}`} key={index}>
                                {/* query.search ? `/category/${category.categoryID}?search=${query.search}` : `/service-category/${category.categoryID}` */}
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
                                        delete router.query.priceRange
                                        router.push(router)
                                    }
                                }}
                            >Clear</button>


                            <button className={`filled-btn w-[110px] ${minPrice || maxPrice ? '' : 'opacity-20 cursor-not-allowed'}`}
                                disabled={minPrice || maxPrice ? false : true}
                                onClick={() => {
                                    if (minPrice && maxPrice) {
                                        router.query.priceRange = `${minPrice}-${maxPrice}`
                                        router.push(router)
                                    }
                                    else if (minPrice) {
                                        router.query.priceRange = `${minPrice}`
                                        router.push(router)
                                    } else if (maxPrice) {
                                        router.query.priceRange = `${maxPrice}`
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
                                        router.query.discountPercentage = e.target.value
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
                                        router.query.discountPercentage = e.target.value
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
                                        router.query.discountPercentage = e.target.value
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
                                        router.query.discountPercentage = e.target.value
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
                                        router.query.discountPercentage = e.target.value
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
                                        if (query.discountPercentage) {
                                            setDiscount('')
                                            delete router.query.discountPercentage
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
                                        if (query.rating) {
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
        </>
    )
}

export default ProductFilter