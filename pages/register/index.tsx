import type { NextPage } from 'next'
import Head from 'next/head'
import RegisterComponent from '../../src/components/auth/Register'
import Alert from '../../src/components/alert/Alert'
import { signUp, clearError, clearMessage } from '../../src/redux/features/authSlice'
import { getServicesCategory } from '../../src/redux/features/serviceSlice'
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks'
import { useRouter } from 'next/router'
import AlertModal from '../../src/components/alert/Alert'
import { useEffect } from 'react'

const Register: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { loading, error, success, message, user } = useAppSelector((state) => state.auth)

  const { loadingFetchServices, servicesCategories } = useAppSelector((state) => state.service)

  useEffect(() => {
    dispatch(getServicesCategory(''))
  }, [dispatch])

  const handleSignUp = (data: any) => {
    dispatch(signUp(data))
  }


  return (
    <div>
      <Head>
        <title>Cue |  The artisan for Digital and Offline Space</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/flip-favicon.png" />
      </Head>

      <RegisterComponent
        register={handleSignUp}
        loading={loading}
        servicesCategories={servicesCategories}
        loadingFetchServices={loadingFetchServices}
      />

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
            router.push(`/verify/${user.email}`)
          }}
        />
      }

      <footer >

      </footer>
    </div>
  )
}

export default Register