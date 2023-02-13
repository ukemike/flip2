import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Laptop } from '../../../assets'
import Carousel from "react-multi-carousel";

const TopCategoris = ({ productsCategory }: { productsCategory: any }) => {
    const responsive2 = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            partialVisibilityGutter: 15
        }
    };
    return (
        <>
            {/* top categories */}

            <div className="mt-8">
                <h1 className="text-gray22 text-lg md:text-xl font-medium text-center">Top Categories</h1>
                <p className="text-gray22 text-sm font-light text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est quis tellus duis venenatis, at <br /> imperdiet. Suspendisse ultrices fermentum dignissim volutpat. </p>

                <div className="flex flex-row  mt-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        className='w-full z-0'
                    >
                        {productsCategory.map((item: any, index: number) => (
                        <Link href={`/category/${item.categoryID}`} key={index}>
                            <a className="p-2 relative rounded-full mr-2 flex flex-col gap-2 hover">
                                <div className="p-2 relative rounded-full mr-2">
                                    <Image src={item.image} alt="featured product" className="rounded-full" width={150} height={150} />
                                    <div>
                                        <p className="text-gray22 text-sm md:text-base font-medium text-center">{item.name}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                        ))}


                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default TopCategoris