import React from 'react'
const CardItem = (props: any) => {
    return (
        <>
            <div className="card rounded-[12px]">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h5 className="text-base font-medium text-black-100">{props.title}</h5>
                        <h3 className="text-4xl font-semibold text-black-100 mb-1">{props.stat}</h3>
                        <h5 className="text-xs font-light text-gray33">{props.detail}</h5>
                    </div>

                    <div className="w-20 h-20">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardItem