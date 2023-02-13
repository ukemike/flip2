import React from 'react'
import Layout from '../../src/components/dashboard/admin-layout/AdminLayout'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProposalComponent from '../../src/components/dashboard/proposal/Proposal'
import { getProposalByJob, acceptProposal, rejectProposal, sendReview, clearProposalError, clearProposalMessage } from '../../src/redux/features/proposalSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import AlertModal from '../../src/components/alert/Alert'

const Proposal: NextPage = (props: any) => {
  const dispatch = useAppDispatch()
  const { proposals, success, error, message, loading, loadingFetctProposals } = useAppSelector(state => state.proposal)

  useEffect(() => {
    dispatch(getProposalByJob(props.proposalId))
  }, [dispatch, props.proposalId])

  const handleAcceptProposal = (id: number) => {
    dispatch(acceptProposal(id))
  }

  const handleRejectProposal = (data: any) => {
    dispatch(rejectProposal(data))
  }

  const handleSendReview = (data: any) => {
    dispatch(sendReview(data))
  }

  return (
    <Layout title="Proposal">
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
        acceptProposal={handleAcceptProposal}
        rejectProposal={handleRejectProposal}
        sendReview={handleSendReview}
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
            dispatch(getProposalByJob(props.proposalId))
          }}
        />
      }

      <footer >

      </footer>
    </Layout>
  )
}

export const getServerSideProps: GetStaticProps = async (context: any) => {
  const proposalId = context.params.proposalId
  return {
    props: {
      proposalId: proposalId
    }
  }
}

export default Proposal