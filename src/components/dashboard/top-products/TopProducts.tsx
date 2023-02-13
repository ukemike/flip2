import React from 'react'
import { Phone1 } from '../../../../src/assets'
import Image from 'next/image'
import Link from 'next/link'

const TopProducts = () => {
    return (
        <>
            <div className="card">
                <h3 className='text-xl text-black-100 font-normal mb-4'>Recent Update</h3>
                <div className="flex flex-col gap-4">

                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-normal'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-normal'>Women</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-medium'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-medium'>Women</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-medium'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-medium'>Women</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-medium'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-medium'>Women</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-medium'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-medium'>Women</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/product/1">
                        <a className="flex items-center gap-4  border-b-[2px] border-gray34 pb-2 hover">
                            <Image src={Phone1} alt="product" width={50} height={50} />
                            <div className="flex flex-col gap-1">
                                <span className='text-sm text-black-100 font-medium'>Assorted Cross Bag</span>
                                <span className='text-sm text-gray33 font-medium'>Women</span>
                            </div>
                        </a>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default TopProducts