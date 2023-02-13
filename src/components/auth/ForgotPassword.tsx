import { useState } from 'react'
import { Rocket, Google, Facebook, Apple } from '../../assets'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import AuthStyles from './Auth.module.scss'

const ForgotPassword = (props: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        props.forgotPassword(data)
    }

    return (
        <>
            <div className={AuthStyles.auth_split_screen}>

                <div className={AuthStyles.auth_left_screen}>
                    <section>
                        <h1>Create exceptional personalized experiences for your friends and loved ones</h1>
                        <p>Buy and sell platform for all</p>
                    </section>
                </div>

                <div className={AuthStyles.auth_right_screen}>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <section>
                            <h2>Forgot Password</h2>
                        </section>

                        <div className={AuthStyles.input_container}>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='example@mail.com'
                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid Email Address"
                                    }
                                })}
                            />
                            {errors.email && errors.email.message === 'Invalid Email Address' ?
                                (<span className={AuthStyles.error}>{errors.email.message}</span>)
                                : null
                            }
                            {errors.email && <span className={AuthStyles.error}>Email is required</span>}
                        </div>

                        <div className={AuthStyles.auth_btn}>
                            <button type="submit">Submit</button>
                        </div>



                        <div className={AuthStyles.auth_footer}>
                            <p>Not registered yet? <Link href="/register"><a>Create an Account</a></Link></p>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default ForgotPassword