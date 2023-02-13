/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { CheckGrey, CheckGreen, Money, Card, Transfer, Standard, Gen } from '../../../assets'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { shortenText, formatAmount } from '../../../utils/functions'
import { usePaystackPayment } from 'react-paystack';
import Select from 'react-select'
import { getLgas } from '../../../redux/features/accountSlice'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'

const Checkout = (props: any) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { lgas } = useAppSelector((state) => state.account)

    const [step1, setStep1] = React.useState('active')
    const [step2, setStep2] = React.useState('inactive')
    const [step3, setStep3] = React.useState('inactive')
    const [summary, setSummary] = React.useState('inactive')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [delivery_address, setDeliveryAddress] = useState('')
    const [payment_method, setPaymentMethod] = useState('wallet')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [lga, setLga] = useState('')
    const [state_id, setStateId] = useState(0)
    const [lga_id, setLgaId] = useState('')
    const [cart, setCart] = useState([] as any)
    const [formError, setFormError] = useState(false)
    const [deliveryMethod, setDeliveryMethod] = useState('delivery')
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        if (props.cartItems) {
            let total = 0
            props.cartItems.map((item: any) => {
                total = total + item.numberOfItems
            })
            setTotalItems(total)

            let price = 0
            props.cartItems.map((item: any) => {
                price = price + (item.numberOfItems * item.product.product.discount.discountAmount)
            })
            setTotalPrice(price)

            let shipping = 0
            props.cartItems.map((item: any) => {
                shipping = shipping + item.product.product.delivery.shippingFee
            })
            setShippingFee(shipping)

            let amount = 0
            props.cartItems.map((item: any) => {
                amount = amount + (item.numberOfItems * item.product.product.discount.discountAmount) + item.product.product.delivery.shippingFee
            })
            setTotalAmount(amount)
            setCart(
                props.cartItems.map((item: any) => {
                    return {
                        cart_id: item.cartID,
                        delivery_charge: item.product.product.delivery.shippingFee
                    }
                })
            )
        }
    }, [props.cartItems])

    useEffect(() => {
        if (state_id !== 0) {
            dispatch(getLgas(state_id))
        }
    }, [state_id, dispatch])

    useEffect(() => {
        if (props.profile && props.profile.state && props.profile.lga) {
            setFirstName(props.profile.firstName)
            setLastName(props.profile.lastName)
            setDeliveryAddress(props.profile.address)
            setPhone(props.profile.phone)
            setEmail(props.profile.email)
            setState(props.profile.state.stateName)
            setLga(props.profile.lga.lgaName)
            setStateId(props.profile.state.stateID)
            setLgaId(props.profile.lga.lgaID)
        }
    }, [props.profile])

    const handleStep1 = (e: any) => {
        e.preventDefault()
        if (firstName && lastName && delivery_address && phone && state && lga) {
            setStep1('completed')
            setStep2('active')
            setStep3('inactive')
            setFormError(false)
        } else {
            setFormError(true)
        }
    }

    const handleStep2 = (e: any) => {
        e.preventDefault()
        if (deliveryMethod) {
            setStep1('completed')
            setStep2('completed')
            setStep3('active')
            setFormError(false)
        } else {
            setFormError(true)
        }
    }

    const handleStep3 = (e: any) => {
        e.preventDefault()
        if (payment_method) {
            setStep1('completed')
            setStep2('completed')
            setStep3('completed')
            setSummary('active')
            setFormError(false)
        } else {
            setFormError(true)
        }
    }

    const handleCreateOrder = () => {
        const data = {
            payment_method,
            delivery_address,
            phone,
            amount: totalAmount,
            cart,
            state: state_id,
            lga: lga_id
        }
        props.createOrder(data)
    }

    const handleCreateOrder2 = (payment_reference: any) => {
        const data = {
            payment_method,
            delivery_address,
            phone,
            cart,
            amount: totalAmount,
            payment_reference: payment_reference,
            state: state_id,
            lga: lga_id
        }
        props.createOrder(data)
    }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: totalAmount * 100,
        publicKey: 'pk_test_8c854743085abebb6e7948dbeb4668625d57a9aa',
    };

    const onSuccess: any = (reference: any) => {
        if (reference) {
            handleCreateOrder2(reference.reference)
        }
    }

    const onClose = () => {
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    // useEffect(() => {
    //     if (orderSuccess) {
    //         router.push('/')
    //     }
    // }, [orderSuccess, router])


    // scroll to the top when a new step changes
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [step1, step2, step3, summary])


  

    return (
        <>
            <div className="pt-6 md:px-32 lg:px-40">

                {/* stepper */}
                <div className='flex flex-row'>

                    <div className={`w-1/2 h-[2px] relative ${step1 === 'completed' ? 'bg-primary4' : 'bg-gray15'}`}>
                        <div className={`absolute top-[-3px] left-[-4px] w-2 h-2 bg-primary4 rounded-full`}></div>
                    </div>

                    <div className={`w-1/2 h-[2px] relative ${step2 === 'completed' ? 'bg-primary4' : 'bg-gray15'}`}>
                        <div className={`absolute top-[-3px] left-[-4px] w-2 h-2 rounded-full ${step2 === 'active' || 'completed' ? 'bg-primary4' : 'bg-gray15'}`}></div>
                    </div>

                    <div className={`relative ${step3 === 'completed' ? 'bg-primary4' : 'bg-gray15'}`}>
                        <div className={`absolute top-[-3px] left-[-4px] w-2 h-2 rounded-full ${step3 === 'active' || 'completed' ? 'bg-primary4' : 'bg-gray15'}`}></div>
                    </div>

                </div>

                {/* checkout address */}
                {step1 === 'active' && (
                    <div className='flex flex-col mt-6'>

                        <div className="flex flex-row bg-backg2 p-3 mb-8">
                            <p className="text-base font-medium text-gray11">Checkout  <span className="text-sm font-light text-gray16">-  Address Details</span></p>
                        </div>

                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">First Name</label>
                                    <input type="text" className="w-full h-10 px-3 mb-2 border border-gray20 rounded-[10px] focus:outline-none focus:primary3 focus:border-primary3 font-light" placeholder="Enter First Name"
                                        value={firstName || ''}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {formError && !firstName && <span className="text-red text-sm font-light">First Name is required</span>}
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">Last Name</label>
                                    <input type="text" className="w-full h-10 px-3 mb-2 border border-gray20 rounded-[10px] focus:outline-none focus:primary3 focus:border-primary3 font-light" placeholder="Enter Last Name"
                                        value={lastName || ''}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {formError && !lastName && <span className="text-red text-sm font-light">Last Name is required</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">Mobile Number</label>
                                    <input type="text" className="w-full h-10 px-3 mb-2 border border-gray20 rounded-[10px] focus:outline-none focus:primary3 focus:border-primary3 font-light" placeholder="Enter Mobile Number"
                                        value={phone || ''}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    {formError && !phone && <span className="text-red text-sm font-light">Phone Number is required</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">State / Region</label>
                                    <Select
                                        className="rounded-md text-sm font-light text-gray11 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        options={
                                            props.states && props.states.map((state: any, index: any) => (
                                                { value: state.stateID, label: state.stateName }
                                            ))
                                        }
                                        placeholder="Select State"
                                        value={state ? { value: state_id, label: state } : null}
                                        onChange={(e: any) => {
                                            setStateId(e.value);
                                            setState(e.label);
                                        }}

                                    />
                                    {formError && !state && <span className="text-red text-sm font-light">State is required</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">City</label>
                                    <Select
                                        className="rounded-md text-sm font-light text-gray11 focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                        options={
                                            lgas && lgas.map((lga: any, index: any) => (
                                                { value: lga.lgaID, label: lga.lgaName }
                                            ))
                                        }
                                        placeholder="Select City"
                                        value={lga ? { value: lga_id, label: lga } : null}
                                        onChange={(e: any) => {
                                            setLgaId(e.value);
                                            setLga(e.label);
                                        }}

                                    />
                                    {formError && !lga && <span className="text-red text-sm font-light">City is required</span>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray16 text-sm font-medium mb-2">Home Address</label>
                                    <input type="text" className="w-full h-10 px-3 mb-2 border border-gray20 rounded-[10px] focus:outline-none focus:primary3 focus:border-primary3 font-light" placeholder="Enter Home Address"
                                        value={delivery_address || ''}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                    />
                                    {formError && !delivery_address && <span className="text-red text-sm font-light">Delivery Address is required</span>}
                                </div>

                                <div className="flex flex-col">
                                    <button className="outline-btn" type='button' onClick={() => router.push('/cart')}>Back</button>
                                </div>

                                <div className="flex flex-col">
                                    <button className="filled-btn" type='button' onClick={handleStep1}>
                                        Save
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                )}

            </div>

            {/* checkout delivery */}
            {step2 === 'active' && (
                <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
                    <div className="w-full md:w-2/3">

                        <div className='mb-2'>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGreen} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Address Details</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-3">
                                <div className="flex flex-col px-10">
                                    <p className="text-sm font-medium text-gray16">{
                                        `${firstName} ${lastName}`
                                    }</p>
                                    <p className="text-sm font-light text-gray11">
                                        {`${state}`} {`${lga}`}, {`${delivery_address} `}
                                    </p>
                                    <p className="text-sm font-light text-gray11">
                                        {` ${phone}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGrey} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Delivery Method</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-3">
                                <div className="flex flex-col px-5 sm:px-10">
                                    <p className="text-sm font-medium text-gray16 mb-2">How do you want your order delivered?</p>

                                    <label className="flex gap-4 p-3 border border-primary3 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] mb-4">
                                        <input type="radio" name="delivery" value="delivery" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full"
                                            checked={deliveryMethod === 'delivery'}
                                            onChange={(e) => setDeliveryMethod(e.target.value)}
                                        />
                                        <div>
                                            <p className="text-[15px] font-medium text-gray16 mb-2">Door Delivery</p>
                                            <p className="text-sm font-medium text-gray14">Delivered by Wednesday 26 Oct <span className="text-sm font-medium text-primary4">(Cheapest Shipping + Delivery fees)</span></p>
                                        </div>
                                    </label>

                                    <label className="flex gap-4 p-3 border border-primary3 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]">
                                        <input type="radio" name="delivery" value="pickup" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full"
                                            checked={deliveryMethod === 'pickup'}
                                            onChange={(e) => setDeliveryMethod(e.target.value)}
                                        />
                                        <div>
                                            <p className="text-[15px] font-medium text-gray16 mb-2">Pickup Station (Cheaper Shipping Fees than Door Delivery)</p>
                                            <p className="text-sm font-medium text-gray14">Delivered by Wednesday 26 Oct <span className="text-sm font-medium text-primary4">(Cheapest Shipping + Delivery fees)</span></p>
                                        </div>
                                    </label>
                                </div>


                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGrey} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Shipment Details</p>
                            </div>

                            <div className="bg-gray17 p-3">
                                <div className='flex flex-col '>

                                    {props.cartItems && props.cartItems.map((item: any, index: number) => (
                                        <div key={index} className="flex flex-col border-b-2 border-gray19 pt-3 pb-3">
                                            <p className="text-sm font-medium text-gray11 mb-2" >
                                                Shipment 1 of {props.cartItems.length} <br /> 1x {item.product.product.name}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                <div className='flex flex-row justify-between mt-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Subtotal:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                                </div>
                                <div className='flex flex-row justify-between mt-3 border-b-2 border-gray19 pb-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Delivery Fee:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(shippingFee)}</p>
                                </div>


                                <div className='flex flex-row justify-between mt-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Total:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalAmount)}</p>
                                </div>

                            </div>
                            {/* PROCEED BUTTON */}
                            <button className="filled-btn mt-10"
                                onClick={handleStep2}
                            >
                                Proceed to next step
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
                        </div>

                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="flex flex-row justify-between bg-backg2 p-3 mb-2">
                            <p className="text-base font-thin text-gray11">Cart <span className="text-sm font-medium text-gray16">- Cart Summary</span></p>
                            <p className="text-sm font-medium text-gray16">{totalItems} Item(s)</p>
                        </div>


                        <div className="bg-gray17 p-3">
                            <div className={`overflow-y-auto overflow-x-auto mb-4 ${props.cartItems.length > 1 ? 'h-[170px]' : 'h-[75px]'}`}>
                                {props.cartItems && props.cartItems.map((item: any, index: number) => (
                                    <div className="flex gap-4 border-b-2 border-gray19 pb-1 mb-2" key={index}>
                                        <div>
                                            <Image src={item.product.product.images[0].image} alt="product" width={100} height={100} />
                                        </div>
                                        <div className="w-3/4">
                                            <div className="flex flex-col gap-1">
                                                <div className='flex mb-4'>
                                                    <p className="text-sm font-medium text-gray16">{
                                                        shortenText(item.product.product.name, 25)
                                                    }</p>
                                                </div>

                                                <div className='flex justify-between'>
                                                    <p className="text-sm font-medium text-primary6">₦{
                                                        formatAmount(item.product.product.discount.discountAmount)
                                                    }</p>
                                                    <p className="text-sm font-medium text-gray11">Qty: {
                                                        item.numberOfItems
                                                    }</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-row justify-between mb-1'>
                                <div>
                                    <p className="text-sm font-light text-gray11 mb-2">Subtotal:</p>
                                </div>
                                <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                            </div>

                            {shippingFee > 0 && (
                                <div className='flex flex-row justify-between border-b-2 border-gray19 pb-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Delivery Fee:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(shippingFee)}</p>
                                </div>
                            )}

                            <div className='flex flex-row justify-between mt-3'>
                                <div>
                                    <p className="text-sm font-light text-gray11 mb-2">Total:</p>
                                </div>
                                <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalAmount)}</p>
                            </div>

                            <div className="flex flex-row gap-3 mt-4">
                                <div className="w-full">
                                    <Link href="/cart">
                                        <a className="outline-btn">
                                            Modify Cart
                                        </a>
                                    </Link>
                                </div>
                                <div className="w-full">
                                    <button className="filled-btn" onClick={handleStep2}>
                                        Buy Now
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}

            {/* checkout payment */}
            {step3 === 'active' && (
                <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
                    <div className="w-full md:w-2/3">

                        <div className='mb-2'>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGreen} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Address Details</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-3">
                                <div className="flex flex-col px-10">
                                    <p className="text-sm font-medium text-gray16">{
                                        `${firstName} ${lastName}`
                                    }</p>
                                    <p className="text-sm font-light text-gray11">
                                        {`${delivery_address} `}
                                    </p>
                                    <p className="text-sm font-light text-gray11">
                                        {` ${phone}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGreen} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Delivery Method</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-3">

                                {deliveryMethod === 'delivery' ? (
                                    <div className="flex flex-col px-10">
                                        <p className="text-sm font-light text-gray11">
                                            {`${delivery_address} `}
                                        </p>
                                        <p className="text-sm font-light text-gray11">
                                            {` ${phone}`}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col px-10">
                                        <p className="text-sm font-medium text-gray16">Pickup</p>
                                        <p className="text-sm font-light text-gray11">28 Bello Oyebanji Close, AIT Road, Abule Egba, Lags
                                            +2349039948498</p>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div>
                            <div className="flex bg-backg2 p-3 mb-2">
                                <Image src={CheckGrey} alt="cart" />
                                <p className="text-sm font-medium text-gray16 ml-6">Payment Method</p>
                            </div>

                            <div className="flex flex-col gap-4 bg-gray17 p-3">
                                <div className="flex flex-col px-5 sm:px-10">
                                    <p className="text-sm font-medium text-gray16 mb-2">How do you want to pay your order?</p>

                                    <label className="flex gap-4 p-3 md:w-[255px] border border-primary6 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] mb-4">
                                        <input type="radio" name="payment_method" value="paystack" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full"
                                            checked={payment_method === 'paystack'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div>
                                            <p className="text-[15px] font-light text-gray16 mb-2">Pay with cards</p>
                                            <Image src={Card} alt="card" />
                                        </div>
                                    </label>

                                    <hr className='mb-3 bg-gray19 border-none h-[1px]' />

                                    <label className="flex gap-4 py-7 px-3 md:w-[255px] border border-primary6 rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] mb-4">
                                        <input type="radio" name="payment_method" value="wallet" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full"
                                            checked={payment_method === 'wallet'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <div className='flex items-center justify-between w-full'>
                                            <p className="text-[15px] font-light text-gray16 mb-2">Pay with wallet</p>
                                            <Image src={Transfer} alt="card" />
                                        </div>

                                    </label>


                                    <hr className='mb-3 bg-gray19 border-none h-[1px]' />

                                    <label className="flex gap-4 p-3 md:w-1/2 mb-4">
                                        <input type="radio" name="delivery" value="delivery" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full" disabled />
                                        <div className="flex gap-4 items-center">
                                            <Image src={Money} alt="card" />
                                            <p className="text-[15px] font-medium text-gray16 mb-2">Cash on Delivery</p>
                                        </div>
                                    </label>

                                    <hr className='mb-3 bg-gray19 border-none h-[1px]' />

                                    <label className="flex gap-4 p-3 mb-4">
                                        <input type="radio" name="delivery" value="delivery" className="focus:outline-none focus:primary3 focus:border-primary3 w-4 h-6 text-primary3 border-gray20 rounded-full" disabled />
                                        <div className="flex gap-4 items-center">
                                            <Image src={Standard} alt="card" />
                                            <p className="text-[15px] font-medium text-gray16 mb-2">Standard Chartered Credit Card @ 1.5% Interest - Up to 12 months</p>
                                        </div>
                                    </label>

                                    <hr className='mb-3 bg-gray19 border-none h-[1px]' />
                                </div>


                            </div>
                        </div>

                        <div className='mb-2'>

                            <div className="bg-gray17 p-3">

                                <div className='flex flex-row justify-between mt-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Subtotal:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                                </div>
                                <div className='flex flex-row justify-between mt-3 border-b-2 border-gray19 pb-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Delivery Fee:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(shippingFee)}</p>
                                </div>


                                <div className='flex flex-row justify-between mt-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Total:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalAmount)}</p>
                                </div>

                            </div>
                            {/* PROCEED BUTTON */}
                            <button className="filled-btn mt-10"
                                onClick={handleStep3}
                            >
                                Confirm Order
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
                        </div>

                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="flex flex-row justify-between bg-backg2 p-3 mb-2">
                            <p className="text-base font-thin text-gray11">Cart <span className="text-sm font-medium text-gray16">- Cart Summary</span></p>
                            <p className="text-sm font-medium text-gray16">{totalItems} Item(s)</p>
                        </div>


                        <div className="bg-gray17 p-3">
                            <div className={`overflow-y-auto overflow-x-auto mb-4 ${props.cartItems.length > 1 ? 'h-[170px]' : 'h-[75px]'}`}>
                                {props.cartItems && props.cartItems.map((item: any, index: number) => (
                                    <div className="flex gap-4 border-b-2 border-gray19 pb-1 mb-2" key={index}>
                                        <div>
                                            <Image src={item.product.product.images[0].image} alt="product" width={100} height={100} />
                                        </div>
                                        <div className="w-3/4">
                                            <div className="flex flex-col gap-1">
                                                <div className='flex mb-4'>
                                                    <p className="text-sm font-medium text-gray16">{
                                                        shortenText(item.product.product.name, 25)
                                                    }</p>
                                                </div>

                                                <div className='flex justify-between'>
                                                    <p className="text-sm font-medium text-primary6">₦{
                                                        formatAmount(item.product.product.discount.discountAmount)
                                                    }</p>
                                                    <p className="text-sm font-medium text-gray11">Qty: {
                                                        item.numberOfItems
                                                    }</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex flex-row justify-between mb-1'>
                                <div>
                                    <p className="text-sm font-light text-gray11 mb-2">Subtotal:</p>
                                </div>
                                <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalPrice)}</p>
                            </div>

                            {shippingFee > 0 && (
                                <div className='flex flex-row justify-between border-b-2 border-gray19 pb-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2">Delivery Fee:</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦ {formatAmount(shippingFee)}</p>
                                </div>
                            )}

                            <div className='flex flex-row justify-between mt-3'>
                                <div>
                                    <p className="text-sm font-light text-gray11 mb-2">Total:</p>
                                </div>
                                <p className="text-sm font-medium text-gray11">₦ {formatAmount(totalAmount)}</p>
                            </div>

                            <div className="flex flex-row gap-3 mt-4">
                                <div className="w-full">
                                    <Link href="/cart">
                                        <a className="outline-btn">
                                            Modify Cart
                                        </a>
                                    </Link>
                                </div>
                                <div className="w-full">
                                    <button className="filled-btn" onClick={handleStep3}>
                                        Buy Now
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}

            {/* summary */}
            {summary === 'active' && (
                <div className="flex flex-col-reverse md:flex-col-reverse md:px-40 gap-4 pt-6">

                    <div className="w-full">
                        {payment_method === 'paystack' && (
                            <div className="bg-gray17 p-3">
                                <div className='flex flex-row justify-between border-b-2 border-gray19 pb-3'>
                                    <p className="text-base font-medium text-gray11 mb-2">You will pay with</p>
                                </div>

                                <div className='flex flex-row justify-between mt-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2"><span className="mr-3">Visa</span>  XXXX - 7005</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray11">₦150,000</p>
                                </div>

                                <div className='flex flex-row mt-3 border-b-2 border-gray19 pb-3'>
                                    <div>
                                        <p className="text-sm font-light text-gray11 mb-2"><span className="mr-3">Exp</span>02/25</p>
                                    </div>
                                </div>


                            </div>
                        )}
                        <button className="outline-btn mt-3"
                            disabled={props.orderLoading}
                            onClick={
                                () => {
                                    setSummary('inactive')
                                    setStep3('active')
                                }
                            }
                        >
                            Use a Different Payment  Method
                        </button>

                        {payment_method === 'paystack' && (
                            <>
                                {props.orderLoading ? (
                                    <button className="filled-btn  mt-8 flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    </button>
                                ) : (
                                    <button className="filled-btn mt-8"
                                        onClick={
                                            () => {
                                                initializePayment(onSuccess, onClose)
                                            }
                                        }
                                    >
                                        Pay with Card
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </>
                        )}

                        {payment_method === 'wallet' && (
                            <>
                                {props.orderLoading ? (
                                    <button className="filled-btn mt-8 flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    </button>
                                ) : (
                                    <button className="filled-btn mt-8"
                                        onClick={handleCreateOrder}
                                    >
                                        Pay with Wallet
                                        <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    <div className="w-full">

                        <div className="bg-gray17 p-3">
                            <div className='flex flex-row justify-between border-b-2 border-gray19 pb-3'>
                                <p className="text-base font-medium text-gray16 mb-2">Order Summary</p>
                            </div>

                            <div className='flex flex-row justify-between mt-3'>
                                <div>
                                    <p className="text-sm font-medium text-gray11 mb-2">Total:</p>
                                </div>
                                <p className="text-sm font-medium text-primary3">₦{formatAmount(totalAmount)}</p>
                            </div>
                        </div>


                    </div>

                </div>
            )}

        </>
    )
}

export default Checkout