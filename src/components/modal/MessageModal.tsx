import Image from 'next/image'
import { NumericFormat } from 'react-number-format';
import { CloseDraw } from '../../assets';
import { useState } from 'react'

interface MessageModalProps {
    show: boolean;
    onClose: () => void;
    sendMesage: (data: any) => void;
    userID: string;
    loadingChatMessage: boolean;
}

const MessageModal = (props: MessageModalProps) => {
    const { show, onClose, sendMesage, userID, loadingChatMessage } = props

    const [price, setPrice] = useState('')
    const [priceToDisplay, setPriceToDisplay] = useState('')

    const handleSendMessage = () => {
        const data = {
            message: `I would like to make an offer of ${price}`,
            userID
        }
        sendMesage(data)
        onClose()
        setPrice('')
        setPriceToDisplay('')
    }

    return (
        <>
            {show && (
                <div className='fixed top-0 left-0 z-[99999] flex items-center justify-center w-full h-full bg-black-100 bg-opacity-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ease-in-out'>
                    <div className='bg-white p-6 rounded-[10px] w-[95%] md:w-[400px] md:p-10 flex flex-col items-center justify-center relative'>
                        <button className='absolute top-0 right-0 mt-4 mr-4' onClick={() => {
                            onClose()
                            setPrice('')
                            setPriceToDisplay('')
                        }} >
                            <Image src={CloseDraw} alt='' />
                        </button>
                        <div className='flex flex-col w-full'>
                            <h1 className='text-center text-black-100 font-medium text-base mb-6'>Make an offer</h1>
                            <div className='flex flex-col w-full'>
                                <label className="text-sm text-gray18 font-light mb-2">Enter your price</label>
                                <NumericFormat className="input"
                                    placeholder="Enter your price"
                                    thousandSeparator={true}
                                    prefix={'₦'}
                                    value={priceToDisplay}
                                    onValueChange={(values) => {
                                        const { formattedValue, value } = values;
                                        setPriceToDisplay(formattedValue)
                                        setPrice(value)
                                    }}
                                />


                                {loadingChatMessage ? (
                                    <button className="filled-btn flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    </button>
                                ) : (
                                    <button className='filled-btn w-full mt-5' onClick={handleSendMessage}>
                                        Send Offer
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MessageModal