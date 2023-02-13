import React from 'react'
import Image from 'next/image'
import { Send, Search2, Avatar } from '../../../assets'
import Loader from '../loader/Loader'
import { convertDate } from '../../../utils/functions'

const Message = (props: any) => {

    const [message, setMessage] = React.useState('')
    const [userID, setUserID] = React.useState(3)

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        props.sendMesage({
            message,
            userID: userID,
        })
        setMessage('')
    }

    return (
        <>
            {/* conatacts and chats */}
            {props.loadingFetchAllChats ? (
                <Loader />
            ) : (
                <div className="flex flex-col md:flex-row mt-[-1rem]">
                    <div className="card w-full md:w-1/3 p-0 bg-backg rounded-none">
                        {/* contact search */}
                        <div className="flex items-center justify-center m-2.5 relative">
                            <input type="text" className="bg-gray-100 border-[1px] border-gray24 rounded-[10px] w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary6 focus:border-transparent text-base font-light" placeholder="Search" />
                            <div className="absolute top-2 left-3">
                                <Image src={Search2} alt="search" />
                            </div>
                        </div>
                        <div className="m-2.5">
                            <h3 className="text-lg text-black-100 font-medium">All Chats</h3>
                        </div>

                        {/* contact list */}
                        <div className="overflow-y-auto overflow-x-auto h-[470px]">
                            <div>
                                {/* {props.allChats && props.allChats.map((chat: any, index: any) => ( */}
                                    <div className="flex items-center gap-4 px-2.5 py-2.5 mb-2 hover:bg-gray4 cursor-pointer">
                                        <Image src={Avatar} alt="user" width={50} height={50} className="rounded-full" />
                                        <div className="flex flex-col">
                                            <h1 className="text-base font-medium text-black-100">John Doe</h1>
                                            {/* <p className="text-xs text-gray18 font-light">
                                            <span className="bg-green-500 rounded-full w-2 h-2 inline-block mr-1"></span>
                                            Left 7 mins ago
                                        </p> */}
                                        </div>
                                    </div>
                                {/* ))} */}
                            </div>
                        </div>
                    </div>

                    {/* chat */}
                    <div className="card w-full md:w-3/4 p-0 relative bg-gray4 rounded-none shadow-none">
                        <div>
                            <div className="flex items-center px-5 py-5">
                                <Image src={Avatar} alt="user" width={50} height={50} className="rounded-full" />
                                <div className="flex flex-col ml-4">
                                    <h1 className="text-lg font-medium text-black-100">John Doe</h1>
                                    <p className="text-sm font-light text-gray18">
                                        2 new messages
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* messages between two users */}
                        <div className="overflow-y-auto overflow-x-auto h-[470px] bg-white">
                            <div className="flex flex-col-reverse px-5 py-5">

                                {props.singleChat && props.singleChat.filter((chat: any) => chat.senderID === chat.userID).map((chat: any, index: any) => (
                                    <div className="flex flex-col items-end mb-5" key={index}>
                                        <div className="flex flex-col items-end">
                                            <p className="text-sm font-light text-white px-4 py-2 rounded-lg bg-primary6 max-w-xs">{chat.message}</p>
                                            <p className="text-xs font-light text-gray3 mt-1">{convertDate(chat.date)}</p>
                                        </div>
                                    </div>
                                ))}

                                {props.singleChat && props.singleChat.filter((chat: any) => chat.senderID !== chat.userID).map((chat: any, index: any) => (
                                    <div className="flex flex-col items-start mb-5" key={index}>
                                        <div className="flex flex-col items-start">
                                            <p className="text-sm font-light text-gray38 px-4 py-2 rounded-lg bg-gray37 max-w-xs">{chat.message}</p>
                                            <p className="text-xs font-light text-gray3 mt-1">{convertDate(chat.date)}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* message input */}
                        <div className="absolute bottom-0 w-full">
                            <div className="relative">
                                <form onSubmit={handleSendMessage}>
                                    <input type="text" placeholder="Type a message" className="w-full px-4 py-2 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent h-14 bg-gray21 text-base font-normal"
                                        value={message}
                                        onChange={(e: any) => setMessage(e.target.value)}
                                    />
                                    <button type="submit" className="absolute right-[-8px] top-[-7px] mt-2 mr-2 rounded-r-[10px] 
                                         text-white bg-gray36 w-12 h-14 flex items-center justify-center" onClick={handleSendMessage}>
                                        <Image src={Send} alt="send" width={25} height={25} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Message