import { useState } from 'react'
import { Rocket, Google, Facebook, Apple, Eye } from '../../assets'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import AuthStyles from './Auth.module.scss'

const RegisterComponent = (props: any) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassword ? false : true);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        props.register(data)
    }

    const [roleType, setRoleType] = useState('consumer')

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
                            <h2>Welcome Back</h2>
                        </section>

                        <div className={AuthStyles.input_wrapper}>

                            <div className={AuthStyles.input_container2}>
                                <label htmlFor="firstname">First Name</label>
                                <input type="text" placeholder='First Name'
                                    {...register("firstname", { required: true })}
                                />
                                {errors.firstname && <span className={AuthStyles.error}>First Name is required</span>}
                            </div>

                            <div className={AuthStyles.input_container2}>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" placeholder='Last Name'
                                    {...register("lastname", { required: true })}
                                />
                                {errors.lastname && <span className={AuthStyles.error}>Last Name is required</span>}
                            </div>

                        </div>

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

                        <div className={AuthStyles.input_container}>
                            <label htmlFor="phone">Phone</label>
                            <input type="text" placeholder='Phone'
                                {...register("phone", { required: true })}
                            />
                            {errors.phone && <span className={AuthStyles.error}>Phone is required</span>}
                        </div>

                        <div className={AuthStyles.input_container}>
                            <label htmlFor="role">Role</label>
                            <select {...register("role", { required: true })}
                                onChange={(e) => setRoleType(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="consumer">Consumer</option>
                                <option value="merchant">Merchant</option>
                            </select>
                            {errors.role && <span className={AuthStyles.error}>Role is required</span>}
                        </div>

                        {roleType === 'merchant' ?
                            <>
                                <div className={AuthStyles.input_container}>
                                    <label htmlFor="merchant_type">Merchant Type</label>
                                    <select {...register("merchant_type", { required: true })}>
                                        <option value="">Select Merchant Type</option>
                                        <option value="personal">Personal</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>


                                <div className={AuthStyles.input_container}>
                                    <label htmlFor="category">Category</label>
                                    <select {...register("category", { required: true })}>
                                        <option disabled>Select Category</option>
                                        {props.merchantCategories && props.merchantCategories.map((category: any, index: number) => (
                                            <option value={category.categoryID} key={index}>{category.categoryName}</option>
                                        ))}
                                    </select>
                                </div>

                            </>
                            : null
                        }



                        <div className={AuthStyles.input_container} style={{ marginBottom: "0px" }}>
                            <label htmlFor="password">Password</label>
                            <div className={AuthStyles.eye_icon}>
                                <Image src={Eye} alt="Eye" onClick={togglePasswordVisiblity} />
                            </div>
                            <input placeholder='Password'
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && errors.password.message === 'Password must have at least 6 characters' ?
                                (<span className={AuthStyles.error}>{errors.password.message}</span>)
                                : null
                            }
                        </div>

                        <input type="hidden" value="flip" {...register("application_name")} />

                        <div className={AuthStyles.input_container_check}>

                            <div className={AuthStyles.remember_me}>
                                <input type="checkbox" name="terms" />
                                <label htmlFor="terms">Accept Terms and Conditions</label>
                            </div>

                        </div>

                        <div className={AuthStyles.auth_btn}>
                            {props.loading ? <button type="submit" disabled>Registering...</button> :
                                <button type="submit">Create Account</button>
                            }
                        </div>

                        {/* optional sign in */}

                        <div className={AuthStyles.auth_optional}>
                            <hr />
                            <p>Or sign up with</p>
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
                            <p>All ready have an account? <Link href="/login"><a>Login</a></Link></p>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default RegisterComponent