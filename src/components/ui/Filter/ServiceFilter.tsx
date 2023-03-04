import React from 'react'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getStates, getLgas } from '../../../redux/features/accountSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';

interface ServiceFilterProps {
    servicesCategories: any[];
    query: any;
}

const ServiceFilter = (props: ServiceFilterProps) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { states, lgas } = useAppSelector((state) => state.account)

    useEffect(() => {
        dispatch(getStates(160))
    }, [dispatch])

    const { servicesCategories, query } = props;

    const [minPrice, setMinPrice] = useState(query.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || '');
    const [rating, setRating] = useState(query.rating || '');
    const [state, setState] = useState(query.state || '');
    const [lga, setLga] = useState(query.lga || '');
    const [state_id, setStateId] = useState(0)
    const [lga_id, setLgaId] = useState(0)

    const [stateToDisplay, setStateToDisplay] = useState('')
    const [lgaToDisplay, setLgaToDisplay] = useState('')

    React.useEffect(() => {
        if (query.rating || query.state || query.lga) {
            setRating(query.rating || '')
            setState(query.state || '')
            setLga(query.lga || '')
        }
    }, [query.rating, query.state, query.lga])

    useEffect(() => {
        if (state_id !== 0) {
            dispatch(getLgas(state_id))
        }
    }, [dispatch, state_id])

    React.useEffect(() => {
        if (state !== '' && states.length > 0) {
            const stateName = states.map((state: any) => { return state; });
            setStateToDisplay(stateName.filter((value: any) => value.stateID === parseInt(state))[0]?.stateName)
            setStateId(stateName.filter((value: any) => value.stateID === parseInt(state))[0]?.stateID)
        }
    }, [state, states])

    React.useEffect(() => {
        if (lga !== '' && lgas.length > 0) {
            const lgaName = lgas.map((lga: any) => { return lga; });
            setLgaToDisplay(lgaName.filter((value: any) => value.lgaID === parseInt(lga))[0]?.lgaName)
            setLgaId(lgaName.filter((value: any) => value.lgaID === parseInt(lga))[0]?.lgaID)
        }
    }, [lga, lgas])

    return (
        <>
            <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>
                <div>

                    {/* category filter */}
                    <div className='border-[1px] border-gray31  py-3 rounded-[10px] mb-2 h-[230px] overflow-y-auto'>
                        <p className='text-base font-medium text-gray11 mb-3 px-3'>Category</p>
                        {servicesCategories && servicesCategories.map((category: any, index: number) => (
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

                    {/* location filter */}
                    <div className='border-[1px] border-gray31 px-3 py-3 rounded-[10px] mb-2 h-[200px] overflow-y-auto'>
                        <p className='text-base font-medium text-gray11 pl-1 mb-3'>Location</p>

                        <div className="mb-6">
                            <Select
                                placeholder="Select State"
                                options={
                                    states && states.map((state: any, index: any) => (
                                        { value: state.stateID, label: state.stateName }
                                    ))
                                }
                                value={stateToDisplay ? { value: state_id, label: stateToDisplay } : null}
                                onChange={(e: any) => {
                                    setStateToDisplay(e.label);
                                    setStateId(e.value);
                                    router.query.state = e.value
                                    router.push(router)
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <Select
                                placeholder="Select LGA"
                                options={
                                    lgas && lgas.map((lga: any, index: any) => (
                                        { value: lga.lgaID, label: lga.lgaName }
                                    ))
                                }
                                isDisabled={state_id === 0 ? true : false}
                                value={lgaToDisplay ? { value: lga_id, label: lgaToDisplay } : null}
                                onChange={(e: any) => {
                                    setLgaToDisplay(e.value);
                                    setLga(e.label);
                                    router.query.lga = e.value
                                    router.push(router)
                                }}
                            />
                        </div>

                        <div className='flex flex-row justify-end'>
                            <button type='button' className={`text-sm text-primary6 font-light ${state || lga ? '' : 'opacity-40 cursor-not-allowed'}`}
                                disabled={state || lga ? false : true}
                                onClick={() => {
                                    if (query.state) {
                                        setStateToDisplay('')
                                        setStateId(0)
                                        delete router.query.state
                                        router.push(router)
                                    }
                                    if (query.lga) {
                                        setLgaToDisplay('')
                                        setLgaId(0)
                                        delete router.query.lga
                                        router.push(router)
                                    }
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ServiceFilter