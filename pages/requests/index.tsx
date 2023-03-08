import React from 'react'
import Layout from '../../src/components/dashboard/admin-layout/AdminLayout'
import RequestsComponent from '../../src/components/dashboard/requests/Requests'
import ConsumerRequest from '../../src/components/dashboard/requests/ConsumerRequest'
import type { NextPage } from 'next'
import Head from 'next/head'
import { getServiceRequestByMerchant, getServiceRequestByConsumer, acceptServiceRequest, rejectServiceRequest, payForServiceRequest, confirmServiceRequest, clearMessage, clearError } from '../../src/redux/features/serviceSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect, useState } from 'react'
import AlertModal from '../../src/components/alert/Alert'

const Requests: NextPage = () => {
    const dispatch = useAppDispatch()
    const [isMerchantType, setIsMerchantType] = useState('' as any)
    const [isRole, setIsRole] = useState('' as any)

    const { role, merchant_type } = useAppSelector((state) => state.auth)
    const { loadingFetcServiceRequest, serviceRequests, loadingAcceptRejectServiceRequest, successAcceptRejectServiceRequest, errorAcceptRejectServiceRequest, loading, success, error, message } = useAppSelector((state) => state.service)


    useEffect(() => {
        setIsMerchantType(merchant_type)
        setIsRole(role)
    }, [merchant_type, role])


    useEffect(() => {
        if (isRole === 'merchant' && isMerchantType === 'business') {
            dispatch(getServiceRequestByMerchant(''))
        } else if (isRole === 'consumer') {
            dispatch(getServiceRequestByConsumer(''))
        }
    }, [dispatch, isMerchantType, isRole])

    const handleAcceptServiceRequest = (data: any) => {
        dispatch(acceptServiceRequest(data))
    };

    const handleRejectServiceRequest = (data: any) => {
        dispatch(rejectServiceRequest(data))
    }

    const handlePayForServiceRequest = (data: any) => {
        dispatch(payForServiceRequest(data))
    }

    const handleConfirmServiceRequest = (data: any) => {
        dispatch(confirmServiceRequest(data))
    }


    return (
        <div>
            <Layout title="Services">
                <Head>
                    <title>Flip</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/flip-favicon.png" />
                </Head>

                {isRole === 'merchant' && isMerchantType === 'business' && (
                    <RequestsComponent
                        acceptServiceRequest={handleAcceptServiceRequest}
                        rejectServiceRequest={handleRejectServiceRequest}
                        loadingFetcServiceRequest={loadingFetcServiceRequest}
                        serviceRequests={serviceRequests}
                        loadingAcceptRejectServiceRequest={loadingAcceptRejectServiceRequest}
                        successAcceptRejectServiceRequest={successAcceptRejectServiceRequest}
                        errorAcceptRejectServiceRequest={errorAcceptRejectServiceRequest}
                    />
                )}

                {isRole === 'consumer' && (
                    <ConsumerRequest
                        loadingFetcServiceRequest={loadingFetcServiceRequest}
                        serviceRequests={serviceRequests}
                        loading={loading}
                        success={success}
                        error={error}
                        payForServiceRequest={handlePayForServiceRequest}
                        confirmServiceRequest={handleConfirmServiceRequest}

                    />
                )}


                {errorAcceptRejectServiceRequest &&
                    <AlertModal
                        title='Error'
                        message={errorAcceptRejectServiceRequest}
                        confirmButtonText="Ok"
                        type="error"
                        onConfirm={() => {
                            dispatch(clearError())
                        }}
                    />
                }

                {successAcceptRejectServiceRequest &&
                    <AlertModal
                        title='Success'
                        message={message}
                        confirmButtonText="Ok"
                        type="success"
                        onConfirm={() => {
                            dispatch(clearMessage())
                            { isRole === 'merchant' && isMerchantType === 'business' && dispatch(getServiceRequestByMerchant('')) }
                        }}
                    />
                }



                {error &&
                    <AlertModal
                        title='Error'
                        message={error}
                        confirmButtonText="Ok"
                        type="error"
                        onConfirm={() => {
                            dispatch(clearError())
                        }}
                    />
                }

                {success &&
                    <AlertModal
                        title='Success'
                        message={message}
                        confirmButtonText="Ok"
                        type="success"
                        onConfirm={() => {
                            dispatch(clearMessage())
                            { isRole === 'consumer' && dispatch(getServiceRequestByConsumer('')) }
                        }}
                    />
                }

                <footer >

                </footer>
            </Layout>
        </div>
    )
}

export default Requests