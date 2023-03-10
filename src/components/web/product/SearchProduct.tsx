/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ProductCard2 from '../../ui/ProductCard/ProductCard2';
import { useRouter } from "next/router";
import { useSearchAndPaginationProduct } from '../../../services/paginationHookProduct';
import { useState } from 'react'
import { useAppSelector } from '../../../redux/hooks'
import Pagination from '../../ui/Pagination'
import ProductFilter from '../../ui/Filter/ProductFilter';


const SearchProduct = (props: any) => {
    const router = useRouter()

    const { isAuthenticated } = useAppSelector((state) => state.auth)

    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [number_of_items, setNumberOfItems] = useState(1)
    const [cartID, setCartID] = useState(0)
    const [productID, setProductID] = useState(0)
    const [cartAndProductID, setCartAndProductID] = useState([] as any)

    const { currentItems, currentPage, pages, handleNextBtn, handlePrevBtn } = useSearchAndPaginationProduct(props.filteredProducts, itemsPerPage);

    // handle add to cart
    const handleAddToCart = (productID: any) => {
        if (isAuthenticated) {
            const data = {
                number_of_items: number_of_items.toString(),
                productID: productID
            }
            props.addToCart(data)
        } else {
            router.push('/login')
        }
    }

    // handle update cartadd
    const handleUpdateCartAdd = (number_of_items: any, cartID: any) => {
        props.updateCartAdd({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    // handle update cart remove
    const handleUpdateCartRemove = (number_of_items: any, cartID: any) => {
        props.updateCartRemove({
            cartID: cartID,
            number_of_items: number_of_items.toString()
        })
    }

    // check if product is in cart
    React.useEffect(() => {
        if (props.cartItems.length > 0) {
            const cartAndProductID = props.cartItems.map((cartItem: any) => {
                return {
                    cartID: cartItem.cartID,
                    productID: cartItem.product.product.productID,
                    number_of_items: cartItem.numberOfItems
                }
            })
            setCartAndProductID(cartAndProductID)
        }
    }, [props.cartItems, props.products])

    return (
        <>
            {props.loading || props.loadingFetchProducts || props.filteredProducts.length < 0 ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary3"></div>
                </div>
                :
                <div className="pt-6">

                    <div className="flex flex-col-reverse md:flex-row gap-5 pt-6">


                        {/* filter */}
                        <div className="hidden md:block md:w-1/4">
                            <ProductFilter
                                productsCategory={props.productsCategory}
                                query={props.query}
                            />
                        </div>
                        {/* products */}
                        {props.filteredProducts && props.filteredProducts.length > 0 ?
                            < div className="w-full md:w-3/4">
                                <div className="flex bg-backg2 p-3 mb-1">
                                    <p className="text-base md:text-lg font-medium text-gray16">
                                        Showing {props.filteredProducts && props.filteredProducts.length} results for {props.query.search}
                                    </p>
                                </div>

                                <div className='border-[1px] border-gray23 rounded-[10px] px-2 py-3'>

                                    {currentItems && currentItems.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                            {currentItems && currentItems.map((product: any, index: number) => (
                                                <ProductCard2
                                                    name={product.product.name}
                                                    productID={product.product.productID}
                                                    slug={product.product.slug}
                                                    isDiscountAvailable={product.product.discount.isDiscountAvailable}
                                                    discountAmount={product.product.discount.discountAmount}
                                                    price={product.product.price}
                                                    images={product.product.images}
                                                    averageRating={product.averageRating}
                                                    key={index}
                                                    backgroundColor={'backg2'}

                                                >
                                                    {cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                        item.productID === product.product.productID).length > 0 ? (
                                                        <div className="flex fex-row items-center gap-3 py-4">
                                                            <div className="flex justify-center items-center border-[1px] border-primary3 w-full h-8 rounded-[10px]">
                                                                <div className="flex gap-6 items-center px-2">
                                                                    <button className={cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                                        item.productID === product.product.productID)[0].number_of_items === 1 ? "cursor-not-allowed" : "text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"} disabled={cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) =>
                                                                            item.productID === product.product.productID)[0].number_of_items === 1 ? true : false}
                                                                        onClick={() => {
                                                                            setCartID(cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                            handleUpdateCartRemove(1, cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                        }}>
                                                                        <p className="text-base font-medium">-</p>
                                                                    </button>

                                                                    {props.loadingUpdateCart && cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID === cartID ? (
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                    ) : (
                                                                        <p className="text-sm font-medium text-gray11">
                                                                            {cartAndProductID && cartAndProductID.length > 0 && cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].number_of_items}
                                                                        </p>
                                                                    )}

                                                                    <button className="text-gray11 cursor-pointer w-2 h-2 rounded-full flex items-center justify-center p-3 hover:bg-primary3 hover:text-white"
                                                                        onClick={() => {
                                                                            setCartID(cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                            handleUpdateCartAdd(1, cartAndProductID.filter((item: any) => item.productID === product.product.productID)[0].cartID)
                                                                        }}>
                                                                        <p className="text-base font-medium">+</p>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-row gap-3 mt-4 w-full">
                                                            <div className="w-full">
                                                                {props.cartLoading && product.product.productID === productID ? (
                                                                    <button className="outline-btn">
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary3"></div>
                                                                    </button>
                                                                ) : (
                                                                    <button className="filled-btn"
                                                                        onClick={() => {
                                                                            setProductID(product.product.productID)
                                                                            handleAddToCart(product.product.productID)
                                                                        }}>
                                                                        Add To Cart
                                                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </ProductCard2>
                                            ))}

                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center'>
                                            <p className='text-gray22 text-base font-medium'>No Product Found</p>
                                        </div>
                                    )}

                                    {currentItems.length > 0 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            pages={pages}
                                            handlePrevBtn={handlePrevBtn}
                                            handleNextBtn={handleNextBtn}
                                        />
                                    )}

                                </div>

                            </div>
                            :
                            <div className='flex flex-col gap-4 items-center justify-center w-full h-full pt-4 pb-4'>
                                <p>There are no results for {props.query.search}.</p>
                                <button className='outline-btn w-48' onClick={() => router.push('/')}>Go To HomePage</button>
                            </div>
                        }

                    </div>


                </div>
            }
        </>
    )
}

export default SearchProduct