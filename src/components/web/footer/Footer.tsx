import React from 'react'
import { Phone, Location, Mail, LogoDark, Twitter, Facebook2, Insta } from '../../../assets'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-10">

          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Image src={LogoDark} alt="logo" />
            </div>
            <div className="flex items-center">
              <p className="text-gray11 text-xs font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, nisl eget ultricies lacinia, nisl nunc aliquet nisl, sit amet aliquet nisl nisl sit amet dolor. </p>
            </div>
          </div>

          <div className="md:hidden col-span-1">
            <div className="flex flex-row gap-10">
              <div>
                <div className="flex items-center">
                  <ul className="text-gray11 text-sm font-medium">
                    <li className="py-2">
                      <Link href="#"><a>Product</a></Link>
                    </li>
                    <li className="py-2">
                      <Link href="#"><a>About Us</a></Link>
                    </li>
                    <li className="py-2">
                      <Link href="#"><a>Blog</a></Link>
                    </li>
                    <li className="py-2">
                      <Link href="#"><a>Order</a></Link>
                    </li>
                    <li className="py-2">
                      <Link href="#"><a>Buyers</a></Link>
                    </li>
                    <li className="py-2">
                      <Link href="#"><a>Sellers</a></Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="">
                <div className="flex flex-col">
                  <p className='text-gray11 text-base font-medium mb-6'>Create exceptional personalized experiences for your friends and loved ones</p>
                  <button className="filled-btn w-40">
                    Buy Now
                    <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                  </button>
                </div>
              </div>

            </div>



          </div>

          <div className="hidden md:block col-span-1">
            <div className="flex items-center">
              <ul className="text-gray11 text-sm font-medium">
                <li className="py-2">
                  <Link href="#"><a>Product</a></Link>
                </li>
                <li className="py-2">
                  <Link href="#"><a>About Us</a></Link>
                </li>
                <li className="py-2">
                  <Link href="#"><a>Blog</a></Link>
                </li>
                <li className="py-2">
                  <Link href="#"><a>Order</a></Link>
                </li>
                <li className="py-2">
                  <Link href="#"><a>Buyers</a></Link>
                </li>
                <li className="py-2">
                  <Link href="#"><a>Sellers</a></Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden md:block col-span-1">
            <div className="">
              <div className="flex flex-col">
                <p className='text-gray11 text-base font-medium mb-6'>Create exceptional personalized experiences for your friends and loved ones</p>
                <button className="filled-btn w-40">
                  Buy Now
                  <span className="absolute w-3 bottom-0 bg-primary4 inset-y-0 left-0"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col">
              <h3 className="text-gray11 text-lg font-light mb-4">Contact Us</h3>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center mb-4">
                <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                  <Image src={Phone} alt="" />
                </div>
                <div className="flex flex-col pl-2">
                  <p className="text-gray11 font-medium text-sm">+91 1234567890</p>
                </div>
              </div>

              <div className="flex flex-row items-center mb-4">
                <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                  <Image src={Mail} alt="" />
                </div>
                <div className="flex flex-col pl-2">
                  <p className="text-gray11 font-medium text-sm">support@tracka.app</p>
                </div>
              </div>

              <div className="flex flex-row items-center mb-4">
                <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                  <Image src={Location} alt="" />
                </div>
                <div className="flex flex-col pl-2">
                  <p className="text-gray11 font-medium text-sm">No 2, lorem ipsum, ipsum lorem</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* footer bottom*/}
      <div className="bg-primary3">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">

            <div className="md:hidden col-span-1">
              <div className="flex flex-row items-center">
                {/* social media icons */}
                <div className="flex flex-row gap-4">
                  <Link href="#"><a><Image src={Facebook2} alt="" /></a></Link>
                  <Link href="#"><a><Image src={Twitter} alt="" /></a></Link>
                  <Link href="#"><a><Image src={Insta} alt="" /></a></Link>
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="flex flex-row items-center">

                <div className="flex flex-row gap-10">
                  <div className="flex items-center">
                    <p className="text-white text-xs font-light">© 2022 All Rights Reserved.</p>
                  </div>
                  <div className="flex items-center">
                    <Link href="#"><a className="text-white text-xs font-light">Terms & Privacy</a></Link>
                  </div>
                </div>

              </div>
            </div>

            <div className="hidden md:block col-span-1">
              <div className="flex flex-row items-center justify-end pr-[210px]">
                {/* social media icons */}
                <div className="flex flex-row gap-4">
                  <Link href="#"><a><Image src={Facebook2} alt="" /></a></Link>
                  <Link href="#"><a><Image src={Twitter} alt="" /></a></Link>
                  <Link href="#"><a><Image src={Insta} alt="" /></a></Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Footer