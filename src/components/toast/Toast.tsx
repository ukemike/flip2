import React from 'react'
import { CloseToast, TickCircle, CloseCircle } from '../../assets'
import Image from 'next/image'

const Toast = ({ message, bgColor }: { message: any, bgColor: any }) => {
    return (
        <>
           
                <div className={`fixed top-[7.6rem] right-5 z-50 flex flex-col items-center justify-center py-3 pl-3 pr-14 rounded-[10px] border-none`} 
                    style={{ backgroundColor: bgColor === 'green' ? '#12B76A' : '#F04438' }}
                >
                    <div className='flex items-center justify-start gap-3 '>
                        <Image src={bgColor === 'red' ? CloseCircle : TickCircle} alt="close" />
                        <p className='tex-sm text-white font-medium'>{message}</p>
                    </div>
                </div>
            
        </>
    )
}

export default Toast