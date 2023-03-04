import React from 'react'
import Carousel from "react-multi-carousel";
import ProductCard from '../../ui/ProductCard';

const Featured = ({ products }: { products: any }) => {
    const responsive2 = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            partialVisibilityGutter: 15
        }
    };

    return (
        <>
            <div className="mt-8 mb-10">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-gray22 text-base md:text-xl font-medium">Featured Stores</h1>
                    <button className="outline-btn w-28 md:w-40">See All</button>
                </div>

                <div className="flex flex-row mt-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        className='w-full z-0'
                    >
                        {products && products.map((product: any, index: number) => (
                            <ProductCard
                                name={product.product.name}
                                productID={product.product.productID}
                                slug={product.product.slug}
                                isDiscountAvailable={product.product.discount.isDiscountAvailable}
                                discountAmount={product.product.discount.discountAmount}
                                price={product.product.price}
                                images={product.product.images}
                                key={index}
                                backgroundColor={'gray29'}
                            />

                        ))}

                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Featured