import React from 'react'

const NewsLetter = () => {
    return (
        <>
            {/* newsletter */}
            <div className="mt-8">
                <h1 className="text-gray22 text-lg md:text-xl font-medium text-center">Newsletter</h1>
                <p className="text-gray22 text-sm font-light text-center mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ac quis aliquam arcu lacus.</p>

                <div className="flex justify-center items-center">
                    <input type="text" className="w-[400px] h-[50px] border focus:outline-none focus:border-primary3 border-primary3 rounded-l-[10px] pl-4 font-light" placeholder="Enter your email address" />
                    <button className="filled-btn w-[150px] h-[50px] rounded-r-[10px] rounded-l-none">
                        Subscribe
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewsLetter