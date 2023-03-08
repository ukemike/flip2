import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import ForgotPasswordComponent from '../../src/components/auth/ForgotPassword'
const ForgotPassword: NextPage = () => {

    const handleForgotPassword = (data: any) => {
        console.log(data)
    }

    return (
        <div>
            <Head>
                <title>Flip</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/flip-favicon.png" />
            </Head>

            <ForgotPasswordComponent forgotPassword={handleForgotPassword} />

            <footer >

            </footer>
        </div>
    )
}

export default ForgotPassword
