import React from 'react'
import {  Trophy, Guarantee, Support, Shipping } from '../../../assets'
import Image from 'next/image'

const Quality = () => {
    return (
        <>
            <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mt-8">


                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className='w-16 h-16 bg-gray29 flex items-center justify-center rounded-full mr-0 md:mr-2'>
                        <Image src={Trophy} alt="quality" />
                    </div>
                    <div>
                        <p className="text-gray12 text-xs text-center md:text-start md:text-base font-medium">High Quality</p>
                        <span className="hidden md:block text-gray12 text-sm font-light">crafted from top materials</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className='w-16 h-16 bg-gray29 flex items-center justify-center rounded-full mr-0 md:mr-2'>
                        <Image src={Guarantee} alt="quality" />
                    </div>
                    <div>
                        <p className="text-gray12 text-xs text-center md:text-start md:text-base font-medium">Warrany Protection</p>
                        <span className="hidden md:block text-gray12 text-sm font-light">Over 2 years</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className='w-16 h-16 bg-gray29 flex items-center justify-center rounded-full mr-0 md:mr-2'>
                        <Image src={Shipping} alt="quality" />
                    </div>
                    <div>
                        <p className="text-gray12 text-xs text-center md:text-start md:text-base font-medium">Free Shipping</p>
                        <span className="hidden md:block text-gray12 text-sm font-light">Order over N150</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                    <div className='w-16 h-16 bg-gray29 flex items-center justify-center rounded-full mr-0 md:mr-2'>
                        <Image src={Support} alt="quality" />
                    </div>
                    <div>
                        <p className="text-gray12 text-xs text-center md:text-start md:text-base font-medium">24 / 7 Support</p>
                        <span className="hidden md:block text-gray12 text-sm font-light">Dedicated support</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Quality