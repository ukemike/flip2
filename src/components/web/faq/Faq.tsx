import React from 'react'
import Image from 'next/image'
import { ArrowDown } from '../../../assets'

const Faq = () => {
    // faq state 
    const [faq, setFaq] = React.useState([
        {
            id: 1,
            title: 'What is the difference between a website and a web application?',
            content: 'A website is a collection of web pages that are linked together and can be accessed using a web browser. A web application is a software application that is accessed using a web browser. A web application is a software application that is accessed using a web browser.',
            active: false
        },
        {
            id: 2,
            title: 'What is the difference between a website and a web application?',
            content: 'A website is a collection of web pages that are linked together and can be accessed using a web browser. A web application is a software application that is accessed using a web browser. A web application is a software application that is accessed using a web browser.',
            active: false
        },
        {
            id: 3,
            title: 'What is the difference between a website and a web application?',
            content: 'A website is a collection of web pages that are linked together and can be accessed using a web browser. A web application is a software application that is accessed using a web browser. A web application is a software application that is accessed using a web browser.',
            active: false
        },
        {
            id: 4,
            title: 'What is the difference between a website and a web application?',
            content: 'A website is a collection of web pages that are linked together and can be accessed using a web browser. A web application is a software application that is accessed using a web browser. A web application is a software application that is accessed using a web browser.',
            active: false
        },
        {
            id: 5,
            title: 'What is the difference between a website and a web application?',
            content: 'A website is a collection of web pages that are linked together and can be accessed using a web browser. A web application is a software application that is accessed using a web browser. A web application is a software application that is accessed using a web browser.',
            active: false
        }
    ])

    // toggle faq
    const toggleFaq = (id: number) => {
        setFaq(faq.map(item => {
            if (item.id === id) {
                item.active = !item.active
            } else {
                item.active = false
            }
            return item
        }))
    }

    return (
        <>

            <div className="mt-10 mb-10">
                <h1 className="text-gray11 text-base sm:text-[20px] font-medium text-center">Most Frequently Asked Questions</h1>

                <div className="mt-10 flex flex-col justify-center items-center">
                    {faq && faq.map((item, index) => (
                        <div className="flex flex-col justify-center items-center mb-1 w-full" key={index}>
                            <div className={`flex flex-row justify-between items-center w-full md:w-3/4 bg-gray21 cursor-pointer p-4`} onClick={() => toggleFaq(item.id)}>
                                <p className="text-gray22 text-sm font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                <Image src={ArrowDown} alt="arrow" />
                            </div>
                            <div className={`flex w-full md:w-3/4 bg-gray21 p-4 ${item.active ? 'flex' : 'hidden'}`}>
                                <p className="text-gray22 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed semper nunc. Sed auctor, nunc sit amet aliquet lacinia, nunc nisl aliquam nisl, sit amet ultricies nisl nisl sit amet nisl. Sed auctor, nunc sit amet aliquet lacinia, nunc nisl aliquam nisl, sit amet ultricies nisl nisl sit amet nisl.</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Faq