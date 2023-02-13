import React from 'react'
import Sidebar from './Sidebar'
const Layout = (props: any,) => {


    return (
        <>
            <Sidebar title={props.title} />
            <div className="lg:ml-[230px]">
                <main className=''>
                    <div className="mx-auto py-4 px-4 sm:px-6 md:px-8 w-auto h-auto">
                        {props.children}
                    </div>
                </main>
            </div>

        </>
    )
}

export default Layout