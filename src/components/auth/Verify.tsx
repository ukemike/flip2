import { useState } from 'react'
import { Rocket } from '../../assets'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import AuthStyles from './Auth.module.scss'

const Verify = (props: any) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        props.verify(
            {
                email: props.email,
                code: data.code
            }
        )
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
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <section>
                            <h2>  Verify your account</h2>
                        </section>

                        <div className={AuthStyles.input_container}>
                            <label htmlFor="code">Code</label>
                            <input type="text" placeholder='Code'
                                {...register("code", { required: true })}
                            />
                            {errors.code && <span className={AuthStyles.error}>Code is required</span>}
                        </div>

                        <input type="hidden" value={props.email || "email"} {...register("email")} />


                        <div className={AuthStyles.auth_btn}>
                            {props.loading ? <button type="submit" disabled>Loading...</button> :
                                <button type="submit">Submit</button>
                            }
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Verify