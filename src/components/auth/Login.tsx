import { useState } from 'react'
import { Rocket, Google, Facebook, Apple, Eye } from '../../assets'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import AuthStyles from './Auth.module.scss'

const LoginComponent = (props: any) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassword ? false : true);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        props.login(data)
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
                            <h2>Welcome Back</h2>
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


                        <div className={AuthStyles.input_container} style={{ marginBottom: "0px" }}>
                            <label htmlFor="password">Password</label>
                            <div className={AuthStyles.eye_icon}>
                                <Image src={Eye} alt="Eye" onClick={togglePasswordVisiblity} />
                            </div>
                            <input placeholder='Password'
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className={AuthStyles.error}>Password is required</span>}
                        </div>


                        <div className={AuthStyles.input_container_check}>
                            <div className={AuthStyles.remember_me}>
                                <input type="checkbox" name="remember_me" />
                                <label htmlFor="remember_me">Remember me</label>
                            </div>
                            <Link href="/forgot-password">
                                <a >Forgot Password?</a>
                            </Link>
                        </div>

                        <div className={AuthStyles.auth_btn}>
                            {props.loading ? <button type="submit" disabled>Signing in...</button> :
                                <button type="submit">Sign in</button>
                            }
                        </div>

                        {/* optional sign in */}

                        <div className={AuthStyles.auth_optional}>
                            <hr />
                            <p>Or sign in with</p>
                            <hr />
                        </div>

                        <div className={AuthStyles.auth_socials}>
                            <button type="button">
                                <Image src={Google} alt='google auth' />
                            </button>
                            <button type="button">
                                <Image src={Facebook} alt='facebook auth' />
                            </button>
                            <button type="button">
                                <Image src={Apple} alt='apple auth' />
                            </button>
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

export default LoginComponent