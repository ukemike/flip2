/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Menu, ArrowRight, Banner1, Banner2, Chair } from '../../../assets'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'next/link'
import { shortenText } from '../../../utils/functions';

const Banner = ({ productsCategory, products }: { productsCategory: any, products: any }) => {

    const [featuredProducts, setFeaturedProducts] = React.useState<any>([])
    React.useEffect(() => {
        if (products.length > 0) {
            const firstTwoProducts = products.slice(0, 2)
            setFeaturedProducts(firstTwoProducts)
        }
    }, [products])


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 40
        }
    };

    const CustomDotTs = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            index,
            active,
            carouselState: { currentSlide, deviceType }
        } = rest;
        const carouselItems = [] as any;
        return (
            <div className='hidden md:block'>
                <button
                    className={active ? "bg-gray29 w-[10px] h-[10px]  rounded-full border border-gray29 mb-4 mr-2" : "rounded-full border border-gray29 w-[10px] h-[10px] mb-4 mr-2"}
                    onClick={() => onClick()}
                >
                    {React.Children.toArray(carouselItems)[index]}
                </button>
            </div>
        );
    };

    const [width, setWidth] = React.useState(0)

    React.useEffect(() => {
        setWidth(window.innerWidth)
    }, [width])

    return (
        <>
            <div className="flex py-8 md:flex-row md:gap-3 w-full h-full">

                {/* category section */}
                <div className="hidden w-1/5 h-96 md:block">
                    <div className="flex flex-col items-center">

                        <div className="flex flex-row items-center w-full bg-primary3 h-[47px] px-4 rounded-t-[10px]">
                            <Image src={Menu} alt="Arrow Down" />
                            <p className="text-white text-xs font-semibold ml-2">Categories</p>
                        </div>

                        {productsCategory.slice(0, 7).map((item: any, index: number) => (
                            <Link href={`/category/${item.categoryID}`} key={index}>
                                <a className="flex flex-row items-center justify-between w-full bg-gray29 h-[40px] px-4 mt-[2px] cursor-pointer">
                                    <p className="text-black text-xs font-medium">{item.name}</p>
                                    <Image src={ArrowRight} alt="arrow right" />
                                </a>
                            </Link>
                        ))}
                        <Link href={`#`}>
                            <a className="flex flex-row items-center justify-between w-full bg-gray29 h-[42px] px-4 mt-[2px] cursor-pointer">
                                <p className="text-black text-xs font-medium">
                                    More Categories
                                </p>
                                <Image src={ArrowRight} alt="arrow right" />
                            </a>
                        </Link>

                    </div>
                </div>

                <div className="w-full flex flex-row gap-4 md:h-96 md:w-[55%]">
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        partialVisible={true}
                        showDots={true}
                        customDot={<CustomDotTs />}
                        className="w-full z-0">

                        <div className="w-[95%] h-[210px] sm:w-full md:w-full sm:h-[410px] relative">
                            <Image src={Banner1} layout="fill" objectFit="cover" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]' alt='banner' />
                            <div className="absolute top-0 left-0 w-full h-full bg-black-100 bg-opacity-50 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"></div>

                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start p-4 md:pt-14 md:px-20">
                                <div className="flex flex-col justify-center items-start gap-2 md:gap-12">
                                    <div>
                                        <h1 className="text-base sm:text-4xl font-bold text-white leading-[140%] mb-2 md:mb-4">Online, in stores, <br /> wherever you love  <br /> to shop</h1>
                                        <p className="text-white text-sm font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />  Morbi eu velit dignissim,</p>
                                    </div>
                                    <button className="filled-btn rounded-full md:rounded-md md:w-48">
                                        Shop Now
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-[95%] h-[210px] sm:w-full md:w-full sm:h-[410px] relative">
                            <Image src={Banner2} layout="fill" objectFit="cover" className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]' alt='banner' />
                            <div className="absolute top-0 left-0 w-full h-full bg-black-100 bg-opacity-50 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"></div>

                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start p-4 md:pt-14 md:px-20">
                                <div className="flex flex-col justify-center items-start gap-2 md:gap-12">
                                    <div>
                                        <h1 className="text-base sm:text-4xl font-bold text-white leading-[140%] mb-2 md:mb-4">Online, in stores, <br /> wherever you love  <br /> to shop</h1>
                                        <p className="text-white text-sm font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />  Morbi eu velit dignissim,</p>
                                    </div>
                                    <button className="filled-btn rounded-full md:rounded-md md:w-48">
                                        Shop Now
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Carousel>
                </div>

                {/* featured products */}
                <div className="hidden w-1/4 h-96 md:block">
                    <div className="flex flex-col gap-6">
                        {featuredProducts && featuredProducts.map((item: any, index: number) => (
                            <Link href={`/product/${item.product.productID}?name=${item.product.slug}`} key={index}>
                                <a className="relative rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]">
                                    <Image src={Chair} className='rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]' alt='banner'

                                    />
                                    {/* width={305} height={187}  */}
                                    {/* {item.product.images.length > 0 ? (
                                        <>
                                            {item.product.images.map((image: any, index: number) => (
                                                index === 0 && (
                                                    <Image src={image.image} alt="featured product" className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={305} height={197} />
                                                )
                                            ))}
                                        </>
                                    ) : (
                                        <Image src={`https://backendapi.flip.onl/storage/products/X52ZPqygvIvypo25OvYi`} alt="featured product"  className="rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" width={305} height={197} />
                                    )} */}

                                    <div className="absolute top-0 left-0 w-full h-full flex flex-col px-4">
                                        <h1 className="text-gray11 text-[20px] font-medium mt-4 mb-3">{shortenText(item.product.name, 19)}</h1>
                                    </div>
                                </a>
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Banner