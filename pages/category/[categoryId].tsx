import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import "react-multi-carousel/lib/styles.css";
import Nav from '../../src/components/web/nav/Nav'
import CategoryComponent from '../../src/components/web/category/Category'
import Recent from '../../src/components/web/recent/Recent'
import NewsLetter from '../../src/components/web/newsLetter/NewsLetter'
import Footer from '../../src/components/web/footer/Footer'
import { getProductsByCategory, getProductsCategory } from '../../src/redux/features/productSlice'
import { addToCart, getCart, updateCartAdd, updateCartRemove, clearError, clearMessage } from '../../src/redux/features/cartSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from "next/router";
import Toast from '../../src/components/toast/Toast'

const Category: NextPage = (props: any) => {
    const { query } = useRouter() as any
    const dispatch = useAppDispatch()

    const { token } = useAppSelector((state) => state.auth)
    const { loading, products, productsCategory, loadingFetchProducts } = useAppSelector((state) => state.product)
    const { success: cartSuccess, message: cartMessage, error: cartError, loading: cartLoading, cartItems, loadingUpdateCart } = useAppSelector(state => state.cart)

    useEffect(() => {
        dispatch(getProductsByCategory(props.categoryId))
        dispatch(getProductsCategory(token))
    }, [dispatch, props.categoryId, token])

    useEffect(() => {
        if (cartError) {
            setTimeout(() => {
                dispatch(clearError())
            }, 3000);
        }
        if (cartSuccess) {
            setTimeout(() => {
                dispatch(clearMessage())
            }, 3000);
        }
    }, [cartSuccess, cartError, cartMessage, dispatch, token])

    useEffect(() => {
        if (cartSuccess) {
            setTimeout(() => {
                dispatch(getCart(token))
            }, 100);
        }
    }, [cartSuccess, dispatch, token])

    const handleAddToCart = (data: any) => {
        dispatch(addToCart(data))
    }

    const handleUpdateCart = (data: any) => {
        dispatch(updateCartAdd(data))
    }

    const handleUpdateCartRemove = (data: any) => {
        dispatch(updateCartRemove(data))
    }

    return (
        <div>
            <Head>
                <title>Cue |  The artisan for Digital and Offline Space</title>
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

                    <CategoryComponent
                        products={products}
                        loading={loading}
                        query={query}
                        loadingFetchProducts={loadingFetchProducts}
                        productsCategory={productsCategory}
                        id={props.categoryId}

                        addToCart={handleAddToCart}
                        cartLoading={cartLoading}
                        updateCartRemove={handleUpdateCartRemove}
                        updateCartAdd={handleUpdateCart}
                        loadingUpdateCart={loadingUpdateCart}
                        cartItems={cartItems}
                    />

                    <Recent />


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
    const categoryId = context.params.categoryId
    return {
        props: {
            categoryId: categoryId
        }
    }
}
export default Category