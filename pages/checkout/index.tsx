import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '../../src/components/web/nav/Nav'
import NewsLetter from '../../src/components/web/newsLetter/NewsLetter'
import Footer from '../../src/components/web/footer/Footer'
import Checkouts from '../../src/components/web/checkout/Checkout'
import { createOrder, clearError, clearMessage } from '../../src/redux/features/orderSlice'
import { getCart } from '../../src/redux/features/cartSlice'
import { getMyProfile, getStates, getLgas } from '../../src/redux/features/accountSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect, useCallback } from 'react'
import AlertModal from '../../src/components/alert/Alert'
import { useRouter } from 'next/router'

const Checkout: NextPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { success: orderSuccess, message: orderMessage, error: orderError, loading: orderLoading } = useAppSelector(state => state.order)
    const { token } = useAppSelector((state) => state.auth)
    const { cartItems } = useAppSelector((state) => state.cart)
    const { profile, loadingFetchProfile, states, lgas, loadingFetchCountriesStatesLgas } = useAppSelector((state) => state.account)

    // fetch cart items Profile and States
    const fetchCartProfileAndStates = useCallback(() => {
        dispatch(getMyProfile(token))
        dispatch(getCart(token))
        dispatch(getStates(160))
    }, [dispatch, token])

    useEffect(() => {
        fetchCartProfileAndStates()
    }, [fetchCartProfileAndStates])

    // create order
    const handleCreateOrder = useCallback((data: any) => {
        dispatch(createOrder(data))
    }, [dispatch])

    // get lgas
    const handleGetLgas = useCallback((state: number) => {
        dispatch(getLgas(state))
    }, [dispatch])

    return (
        <div>
            <Head>
                <title>Flip</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/flip-favicon.png" />
            </Head>

            <Nav />


            <section className="bg-white w-full h-full">

                <div className='container mx-auto px-4 md:px-10'>

                    <Checkouts
                        createOrder={handleCreateOrder}
                        orderLoading={orderLoading}
                        orderSuccess={orderSuccess}
                        profile={profile}
                        cartItems={cartItems}
                        getLgas={handleGetLgas}
                        states={states}
                        lgas={lgas}
                        loadingFetchCountriesStatesLgas={loadingFetchCountriesStatesLgas}
                        loadingFetchProfile={loadingFetchProfile}
                    />

                    {orderError &&
                        <AlertModal
                            title='Error'
                            message={orderError}
                            confirmButtonText="Try Again"
                            type="error"
                            onConfirm={() => {
                                dispatch(clearError())
                            }}
                        />
                    }

                    {orderSuccess &&
                        <AlertModal
                            title='Success'
                            message={orderMessage}
                            confirmButtonText="Back to Homepage"
                            type="success"
                            onConfirm={() => {
                                dispatch(clearMessage())
                                router.push('/')
                            }}
                        />
                    }
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

export default Checkout