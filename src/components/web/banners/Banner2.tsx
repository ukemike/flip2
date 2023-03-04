import React from 'react'
import Image from 'next/image'
import { Banner } from '../../../assets'
const Banner2 = () => {
    return (
        <>
            {/* banner section */}
            <div className="mt-8">
                <div className="flex flex-col md:flex-row justify-between bg-gradient-to-r from-backg3 to-backg4 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] p-6">

                    <div className="flex flex-col gap-4 mb-4 md:mb-0">
                        <h1 className="text-gray11 text-base md:text-[24px] font-thin">Apple Watch Series 7 GPS 41mm Different colors Aluminium <br />Case - Abyss Sport Band</h1>

                        <p className="text-gray14 text-[14px] font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est quis tellus duis venenatis, at <br /> imperdiet. Suspendisse ultrices fermentum dignissim volutpat.</p>

                        <button className="filled-btn w-40 ">
                            Buy Now
                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                        </button>
                    </div>

                    <div className="relative">
                        <Image src={Banner} alt="featured product" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Banner2