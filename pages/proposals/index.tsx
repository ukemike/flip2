import React from 'react'
import Layout from '../../src/components/dashboard/admin-layout/AdminLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProposalComponent from '../../src/components/dashboard/proposal/Proposals'
import { getAllProposals, updateProposal, withdrawProposal, clearProposalError, clearProposalMessage } from '../../src/redux/features/proposalSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect, useCallback } from 'react'
import AlertModal from '../../src/components/alert/Alert'

const Proposal: NextPage = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.auth)
    const { proposals, success, error, message, loading, loadingFetctProposals } = useAppSelector(state => state.proposal)

    const fetchProposal = useCallback(() => {
        dispatch(getAllProposals(token))
    }, [dispatch, token])

    useEffect(() => {
        fetchProposal()
    }, [fetchProposal])

    const handleUpdateProposal = useCallback((data: any) => {
        dispatch(updateProposal(data))
    }, [dispatch])

    const handleWithdrawProposal = useCallback((id: number) => {
        dispatch(withdrawProposal(id))
    }, [dispatch])

    return (
        <div>
            <Layout title="Proposals">
                <Head>
                    <title>Flip</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/flip-favicon.png" />
                </Head>

                <ProposalComponent
                    proposals={proposals}
                    success={success}
                    loading={loading}
                    loadingFetctProposals={loadingFetctProposals}
                    withdrawProposal={handleWithdrawProposal}
                    updateProposal={handleUpdateProposal}
                />


                {error &&
                    <AlertModal
                        title='Error'
                        message={error}
                        confirmButtonText="Ok"
                        type="error"
                        onConfirm={() => {
                            dispatch(clearProposalError())
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
                            dispatch(clearProposalMessage())
                            dispatch(getAllProposals(token))
                        }}
                    />
                }

                <footer >

                </footer>
            </Layout>
        </div>
    )
}

export default Proposal