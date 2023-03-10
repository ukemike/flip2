import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../../src/components/web/nav/Nav'
import Recent from '../../src/components/web/recent/Recent'
import NewsLetter from '../../src/components/web/newsLetter/NewsLetter'
import SingleProduct from '../../src/components/web/product/SingleProduct'
import Footer from '../../src/components/web/footer/Footer'
import { GetStaticProps } from 'next'
import { getSingleProduct, getSingleProductStat } from '../../src/redux/features/productSlice'
import { addToCart, getCart, updateCartAdd, updateCartRemove, clearError, clearMessage } from '../../src/redux/features/cartSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect, useCallback } from 'react'
import Toast from '../../src/components/toast/Toast'

const Product: NextPage = (props: any) => {
    const dispatch = useAppDispatch()

    const { token } = useAppSelector((state) => state.auth)

    const { product, loadingFetchProducts, productStat } = useAppSelector(state => state.product)

    const { success: cartSuccess, message: cartMessage, error: cartError, loading: cartLoading, cartItems, loadingUpdateCart } = useAppSelector(state => state.cart)

    // fetch product
    const fetchProductCartProductStat = useCallback(() => {
        dispatch(getSingleProduct(props.productId))
        dispatch(getSingleProductStat(props.productId))
        dispatch(getCart(token))
    }, [dispatch, props.productId, token])

    useEffect(() => {
        fetchProductCartProductStat()
    }, [fetchProductCartProductStat])

    // clear error and message after 3 seconds
    useEffect(() => {
        if (cartError) {
            setTimeout(() => {
                dispatch(clearError())
            }, 3000);
        }
        if (cartSuccess) {
            setTimeout(() => {
                dispatch(clearMessage())
                dispatch(getCart(token))
            }, 3000);
        }
    }, [cartSuccess, cartError, cartMessage, dispatch, token])

    // add to cart
    const handleAddToCart = useCallback((data: any) => {
        dispatch(addToCart(data))
    }, [dispatch])

    // update cart add
    const handleUpdateCart = useCallback((data: any) => {
        dispatch(updateCartAdd(data))
    }, [dispatch])

    // update cart remove
    const handleUpdateCartRemove = useCallback((data: any) => {
        dispatch(updateCartRemove(data))
    }, [dispatch])

    return (
        <div>
            <Head>
                <title>Flip</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/flip-favicon.png" />
            </Head>

            <Nav />

            <div className='relative'>
                {cartSuccess && <Toast message={cartMessage} bgColor='green' />}
                {cartError && <Toast message={cartError} bgColor='red' />}
            </div>


            <section className="bg-white w-full h-full">

                <div className='container mx-auto px-4 md:px-10'>

                    <SingleProduct
                        product={product}
                        loadingFetchProducts={loadingFetchProducts}
                        addToCart={handleAddToCart}
                        cartLoading={cartLoading}
                        updateCartRemove={handleUpdateCartRemove}
                        updateCartAdd={handleUpdateCart}
                        loadingUpdateCart={loadingUpdateCart}
                        cartItems={cartItems}
                        productStat={productStat}
                    />

                    <div>
                        <Recent />
                    </div>

                    <NewsLetter />

                    <div className="pt-20"></div>


                </div>

            </section>

            <footer className="bg-backg w-full h-full">
                <Footer />
            </footer>

        </div>
    )
}

export const getServerSideProps: GetStaticProps = async (context: any) => {
    const productId = context.params.productId
    return {
        props: {
            productId: productId
        }
    }
}

export default Product