"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import CartItem from "./CartItem";
import Notification from "../api/(components)/Notification";
import { useSession } from "next-auth/react";
import CardDetails from "./CardDetails";
import clsx from "clsx";

export default function page() {
  const { data: context, status} = useSession();
  const [prices, setPrices] = useState([]); // [{id : "2", price : "32"}]
  const [message, setMessage] = useState({ type: "", content: "" });

          //<hr className={clsx(
              //"h-px my-8 bg-gray-500 border-0 dark:bg-gray-700",
              //{ "w-[73vw]" : !context || status == "unauthenticated",
             //"w-[50vw]" : status == "authenticated"
              //}
          //)}>
          //</hr>
  return (
    <div className = "flex flex-row bg-teal-200 my-20 lg:mx-48 lg:mx-32 justify-center p-3 flex-wrap">
      <div className = "flex flex-col lg:p-6">
        <div className = "flex flex-row lg:gap-3 lg:py-3">
          <Link href = "/Products/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
           <div className = "font-bold text-xl">Browse more Products</div>
        </div>
        <div className = "flex flex-col gap-3">
          <hr className= "h-px my-8 bg-gray-500 border-0 dark:bg-gray-700">
          </hr>
          <Notification message = {message} setMessage={setMessage}/>
          {context && status != "unauthenticated" ? (
            <div className = "flex flex-col gap-2">
              {context.cartItems.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem.product_id}
                    id={cartItem.product_id}
                    setPrices={setPrices}
                    setMessage={setMessage}
                  />
                );
              })}
              {context.cartItems.length == 0 && 
              <div className="text-center py-16">
                <p className="text-2xl">Cart is currently empty.</p>
              </div>
              }
            </div>
          ) : (
            <div className = "text-center py-16 text-2xl">
              {
                status == "Loading" ? 
                <>
                  <p> Loading... </p>
                </>
                :
                <>
                  <p> You have to be logged in to add items to your cart!</p>
                  <p> Log in or sign up <Link href = "/Login" className = "text-blue-500 underline">here</Link>!</p>
                </> 
              }
            </div>
          )}
        </div>
      </div>
      <div className = "lg:ml-6 mt-8 flex-initial w-96">
        {context && 
          <CardDetails prices = {prices} />
        }
      </div>
    </div>
  );
}
