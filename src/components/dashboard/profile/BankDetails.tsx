import React from 'react'
import { useEffect, useState } from 'react'

const BankDetails = (props: any) => {
    // bank state
    const [account_name, setAccountName] = useState('')
    const [account_number, setAccountNumber] = useState('')
    const [bvn_number, setBvnNumber] = useState('')
    const [bank_name, setBankName] = useState('')

    useEffect(() => {
        if (props.userDetails) {
            setAccountNumber(props.userDetails?.bank?.accountNumber || '')
            setBvnNumber(props.userDetails?.bank?.bvnNumber || '')
            setBankName(props.userDetails?.bank?.bankName || '')
            setAccountName(props.userDetails?.bank?.accountName || '')
        }
    }, [props.userDetails])


    // update bank details
    const updateBankDetailsHandler = async (e: any) => {
        e.preventDefault()
        const data = {
            account_name,
            account_number,
            bvn_number,
            bank_name,
            bank_id: 1
        }
        await props.updateBankDetails(data)
    }


    return (
        <>
            <div className='p-4'>

                <div className='flex flex-col gap-4 w-full'>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Bank Name</label>
                            <select className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={bank_name || ''}
                                onChange={(e) => setBankName(e.target.value)}
                            >
                                <option value="" disabled hidden>Select Bank</option>
                                <option value="Access Bank">Access Bank</option>
                                <option value="Citibank">Citibank</option>
                                <option value="Diamond Bank">Diamond Bank</option>
                                <option value="Ecobank Nigeria">Ecobank Nigeria</option>
                                <option value="Fidelity Bank">Fidelity Bank</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Account Number</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={account_number || ''}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='flex flex-col md:flex-row gap-5 w-full'>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>Account Name</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={account_name || ''}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-sm font-medium text-gray16'>BVN Number</label>
                            <input type="text" className="rounded-md p-2 text-sm font-light text-gray11 bg-white focus:outline-none focus:ring-[1px] focus:ring-primary6 focus:border-transparent w-full"
                                value={bvn_number || ''}
                                onChange={(e) => setBvnNumber(e.target.value)}
                            />
                        </div>

                    </div>

                    {props.loading ? (
                        <div className='flex flex-col md:flex-row gap-5 w-full'>
                            <button className="filled-btn flex items-center justify-center gap-3" disabled>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                Saving...
                            </button>
                        </div>
                    ) : (

                        <div className='flex flex-col md:flex-row gap-5 w-full'>
                            <button type='button' className="filled-btn md:w-full" onClick={updateBankDetailsHandler}>
                                Save
                                <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}

export default BankDetails