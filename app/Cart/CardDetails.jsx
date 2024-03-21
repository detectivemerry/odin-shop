"use client"

import React, { useEffect, useState } from 'react'
import masterCardLogo from './Mastercard_logo.png'
import VISALogo from './VISA_logo.png'
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useSession } from "next-auth/react";

export default function CardDetails({ prices }) {
  const cardOptions = [ { alt : "master card logo", src : masterCardLogo}, { alt : "visa logo", src : VISALogo}]
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost ] = useState(50.00);
  const [allowedToCheckout, setAllowedToCheckout] = useState(true);
  const { data : context, update } = useSession();

useEffect(() => {
    if(context.cartItems.length === 0){
        setShippingCost(0.00)
        setAllowedToCheckout(true)
    }
    else{
        setShippingCost(50.00)
        setAllowedToCheckout(false)
    }}, [context.cartItems])

  // update total price
  useEffect(() => {
    let currentTotalPrice = 0;
    prices.forEach((price) => {
      currentTotalPrice += price.total;
    });
    setTotalPrice(() => {
        return Math.round(currentTotalPrice * 100) / 100
    });
  }, [prices]);

  return (
    <div className = "flex flex-col bg-teal-700 text-white rounded-lg p-6 gap-6">
        <div className = "font-bold text-xl">
            Card Details
        </div>
        <div>
            <p>Card Type</p>
            <div className = "flex flex-row justify-center gap-6 ">
                {
                    cardOptions.map((cardOption) => (
                        <div className = "w-2/12 h-auto bg-teal-500 rounded flex flex-col items-center border-4 border-teal-500" key = {cardOption.alt}>
                            <Image
                            src={cardOption.src}
                            alt={`Image of ${cardOption.src}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "100%" }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
        <div>
            <label>Name on card</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
        </div>
        <div>
            Card Number
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1111 2222 3333 4444" required />
        </div>
        <div className = "flex flex-row gap-3">
            <div>
                <label>Expiration date</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mm/yy" required />
            </div>
            <div>
                <label>CVV</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123" required />
            </div>
        </div>

        <div className = "flex flex-col">
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className = "flex flex-row justify-between">
                <div>
                    Subtotal
                </div>
                <div>
                    {!context ? <>Loading...</>: <>
                        ${(Math.round(totalPrice * 100) / 100).toFixed(2)}
                    </>}
                </div>
            </div>
            <div className = "flex flex-row justify-between">
                <div>
                    Shipping
                </div>
                <div>
                    {!context ? <>Loading...</>: <>
                    ${(Math.round(shippingCost* 100) / 100).toFixed(2)}
                    </>}
                </div>
            </div>
            <div className = "flex flex-row justify-between">
                <div>
                    Total (Tax inclu.)
                </div>
                <div className = "font-bold">
                    {!context ? <>Loading...</>: <>
                        ${(Math.round((totalPrice + shippingCost) * 100) / 100).toFixed(2)}
                    </>}
                </div>
            </div>
        </div>

        <div>
            {!context ? <>Loading...</>:
                <Link href = "/Checkout">
                    <button className = {clsx("bg-emerald-300 rounded p-1 w-full font-bold", {
                        "hover:bg-emerald-600" : context.cartItems.length > 0,
                    })}
                    disabled = {allowedToCheckout}
                    >Checkout</button>
                </Link>
            }
        </div>
    </div>
  )
}
