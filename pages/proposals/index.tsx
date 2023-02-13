import React from 'react'
import Layout from '../../src/components/dashboard/admin-layout/AdminLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProposalComponent from '../../src/components/dashboard/proposal/Proposals'
import { getAllProposals, updateProposal, withdrawProposal, clearProposalError, clearProposalMessage } from '../../src/redux/features/proposalSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect } from 'react'
import AlertModal from '../../src/components/alert/Alert'

const Proposal: NextPage = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.auth)
    const { proposals, success, error, message, loading, loadingFetctProposals } = useAppSelector(state => state.proposal)

    useEffect(() => {
        dispatch(getAllProposals(token))
    }, [dispatch, token])

    const handleUpdateProposal = (data: any) => {
        dispatch(updateProposal(data))
    }

    const handleWithdrawProposal = (id: number) => {
        dispatch(withdrawProposal(id))
    }

    return (
        <div>
            <Layout title="Proposals">
                <Head>
                    <title>Cue |  The artisan for Digital and Offline Space</title>
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