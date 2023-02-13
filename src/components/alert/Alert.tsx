/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Success, Fail } from '../../assets'

const AlertModal = ({ title, message, confirmButtonText, onConfirm, type }: { title: any, message: any, confirmButtonText: any, onConfirm: any, type: any }) => {

    return (
        <>
            <div className='fixed top-0 left-0 z-[99999] flex items-center justify-center w-full h-full bg-black-100 bg-opacity-50 
            backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out
            '>
                <div className='bg-white rounded-[10px] w-[95%] md:w-[500px] p-12 flex flex-col items-center justify-center'>

                    <div className='flex items-center justify-center mb-3'>
                        {type === 'error' ? <Image src={Fail} alt="close" width={130} height={130} /> : <Image src={Success} alt="success" />}
                    </div>

                    {title && <h3 className={`text-base font-medium text-center ${type === 'error' ? 'text-red3' : 'text-green3'} `}>{title}</h3>}

                    {message && <p className={`text-sm text-center text-gray11`}>{message}</p>}

                    <div className='flex items-center justify-center gap-3 mt-3'>
                        <button className='filled-btn w-[200px] h-[40px] mt-5' onClick={onConfirm}>
                            {confirmButtonText}
                            <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AlertModal