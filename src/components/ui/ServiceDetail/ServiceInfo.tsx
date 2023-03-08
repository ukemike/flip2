import Image from 'next/image'
import { Medal, Location3, Message, Avatar } from '../../../assets'
import { formatAmount } from '../../../utils/functions'
import MessageModal from '../../modal/MessageModal'
import { useState } from 'react'

interface ServiceInfoProps {
    pricing: string;
    fullName: string;
    userID: string;
    image: string;
    serviceName: string;
    location: string;
    description: string;
    loading: boolean;
    handleRequestService: () => void;
    sendMesage: (data: any) => void;
    loadingChatMessage: boolean;
}

const ServiceInfo = (props: ServiceInfoProps) => {
    const { pricing, fullName, image, serviceName, location, description, loading, handleRequestService, sendMesage, userID, loadingChatMessage } = props

    const [showModal, setShowModal] = useState(false)
    const [showMessageInput, setShowMessageInput] = useState(false)
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        const data = {
            message,
            userID
        }
        sendMesage(data)
        setShowMessageInput(false)
    }
    return (
        <>
            <div className="w-full md:w-1/3">
                <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4">
                    <p className="text-base font-medium text-gray32 mb-1">N{formatAmount(pricing)}</p>
                    <p className="text-sm font-normal text-gray11">Per Service</p>
                </div>

                <div className="flex flex-col bg-gray21 rounded-[20px] px-4 py-4 mt-[10px]">
                    <p className="text-sm font-normal text-gray11">About {fullName}</p>

                    <div className='flex items-center gap-2 mt-4 mb-2'>
                        {image ? (
                            <Image src={image} alt="user" className="rounded-full" width={100} height={100} />
                        ) : (
                            <Image src={Avatar} alt="user" className="rounded-full" width={100} height={100} />
                        )}
                        <div>
                            <p className="text-sm text-gray18 font-light">
                                {serviceName}
                            </p>
                            <div className='flex items-center gap-2'>
                                <Image src={Medal} alt='' />
                                <p className="text-sm text-gray18 font-light">80% Job Success</p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <Image src={Location3} alt='' />
                                <p className="text-sm text-gray18 font-light">{location}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className="text-sm text-gray18 font-light">
                            {description}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 flex-col'>
                        {!showMessageInput && (
                            <button className='outline-btn gap-3 text-primary3 bg-white' onClick={() => setShowMessageInput(true)}>
                                <Image src={Message} alt='' />
                                Start Chat
                            </button>
                        )}

                        {showMessageInput && (
                            <div className='w-full'>
                                <div className='flex justify-between items-center w-full'>
                                    <label className="text-sm text-gray18 font-medium mb-2">Your Message</label>
                                    <button className='text-primary3 text-sm' onClick={() => setShowMessageInput(false)}>Cancel</button>
                                </div>

                                <div className='flex items-center gap-2 mb-2 mt-2'>
                                    <button className='outline-btn text-primary3 text-xs bg-white p-2 font-light' onClick={() => setShowModal(true)}>
                                        Make an offer
                                    </button>
                                    <button className='outline-btn text-primary3 text-xs bg-white p-2 font-light' onClick={() => setMessage(`Is this available?`)} >
                                        Is this available?
                                    </button>
                                    <button className='outline-btn text-primary3 text-xs bg-white p-2 font-light' onClick={() => setMessage(`Last price?`)}>
                                        Last price?
                                    </button>
                                </div>

                                <textarea className="input w-full h-[80px] mb-2"
                                    placeholder="Type your message here"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                {loadingChatMessage ? (
                                    <button className="filled-btn flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    </button>
                                ) : (
                                    <button className='filled-btn mt-2' onClick={() => {
                                        handleSendMessage()
                                        setShowMessageInput(false)
                                    }}>
                                        Send Message
                                    </button>
                                )}
                            </div>
                        )}

                        {loading ? (
                            <button className="filled-btn flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            </button>
                        ) : (
                            <button className='filled-btn'
                                onClick={() => {
                                    handleRequestService()
                                }}
                            >
                                Request Service
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <MessageModal
                show={showModal}
                onClose={() => setShowModal(false)}
                sendMesage={sendMesage}
                loadingChatMessage={loadingChatMessage}
                userID={userID}
            />
        </>
    )
}

export default ServiceInfo