import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../../ui/ProductCard';

const Recent = () => {

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
            <div className="mt-8 mb-10">
                <h1 className="text-gray22 text-xl font-medium">Recently Viewed</h1>

                <div className="flex flex-row mt-4">
                    <Carousel
                        responsive={responsive2}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        ssr={false}
                        className='w-full z-0'
                    >


                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />
                        <ProductCard
                            name={'Infinix Note10'}
                            productID={'1'}
                            slug={'infinix-note10'}
                            isDiscountAvailable={'Yes'}
                            discountAmount={'10'}
                            price={'10000'}
                            images={
                                [
                                    {
                                        image: 'https://easy.unikmarketing.org/storage/products/arPumZ7iF5LeYXz27gKz'
                                    }
                                ]
                            }
                            key={1}
                            backgroundColor={'backg2'}
                        />




                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Recent