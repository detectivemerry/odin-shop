"use client";

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "@/app/context/App.context";
import Link from "next/link";
import ProgressMenu from "./ProgressMenu";
import CartItem from "./CartItem";
import Notification from "./Notification";
import { useSession } from "next-auth/react";
import CardDetails from "./CardDetails";

export default function page() {
  const { data: context, status} = useSession();
  const [prices, setPrices] = useState([]); // [{id : "2", price : "32"}]
  const [message, setMessage] = useState({ type: "", content: "" });

//    <div className="mx-32 bg-teal-300 flex flex-col my-16">
//      <div className="text-3xl border-b-4 border-black py-3">Cart Summary</div>
//      <div>
//        {context && status != "unauthenticated" ? (
//          <>
//            {context.cartItems.length > 0 && (
//              <>
//                <ProgressMenu />
//                <CartItemHeader message={message} />
//                {context.cartItems.map((cartItem) => {
//                  return (
//                    <CartItem
//                      key={cartItem.product_id}
//                      id={cartItem.product_id}
//                      setPrices={setPrices}
//                      setMessage={setMessage}
//                    />
//                  );
//                })}
//                <div className="p-3 float-right flex flex-col justify-center gap-3">
//                  <div className="text-2xl text-center">
//                    Total: ${(Math.round(totalPrice * 100) / 100).toFixed(2)}
//                  </div>
//                  <div>
//                    <Link href="/Checkout">
//                      <button className="border-2 border-teal-300 bg-teal-400 text-teal-700 rounded p-1 hover:bg-teal-700 hover:border-teal-700 hover:text-teal-200">
//                        Proceed to checkout
//                      </button>
//                    </Link>
//                  </div>
//                </div>
//              </>
//            )}
//            {context.cartItems.length === 0 && (
//              <div className="text-center py-16">
//                <p className="text-2xl">Cart is currently empty.</p>
//                <p className="text-xl">
//                  Browse for more items{" "}
//                  <Link className="text-blue-500 underline " href="/Products/">
//                    here
//                  </Link>
//                </p>
//              </div>
//            )}
//          </>
//        ) : (
//          <div className="text-2xl text-center mt-10">
//          {
//            !context ? 
//            <>
//              <p> Loading... </p>
//            </> 
//            :
//            <>
//              <p> You have to be logged in to add items to your cart!</p>
//              <p> Log in or sign up <Link href = "/Login" className = "text-blue-500 underline">here</Link>!</p>
//            </>
//          }
//          </div>
//        )}
//      </div>
//    </div>

            //{
              //context.cartItems.length <= 0 ? 
              //<div className="text-center py-16">
                //<p className="text-2xl">Cart is currently empty.</p>
                //<p className="text-xl">
                  //Browse for more items{" "}
                  //<Link className="text-blue-500 underline " href="/Products/">
                    //here
                  //</Link>
                //</p>
              //</div>
            //}
              //:
  return (
    <div className = "flex flex-row bg-teal-200 my-20 mx-48 justify-between p-3">
      <div className = "flex flex-col p-6">
        <div className = "flex flex-row gap-3 py-3">
          <Link href = "/Products/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
           <div className = "font-bold text-xl">Browse more Products</div>
        </div>
        <div className = "flex flex-col gap-3">
          <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700 w-[50vw]"></hr>
          <Notification message = {message} setMessage={setMessage}/>
          {context && status != "unauthenticated" ? (
            <>
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
            </>
          ) : (
            <div>
              {
                !context ? <div className = "text-center py-16 text-2xl">Loading...</div> : 
                <>
                  <p> You have to be logged in to add items to your cart!</p>
                  <p> Log in or sign up <Link href = "/Login" className = "text-blue-500 underline">here</Link>!</p>
                </>
              }
            </div>
          )}
        </div>
      </div>
      <div className = "w-96 ml-6 mt-8">
        {context && 
          <CardDetails prices = {prices} />
        }
      </div>
    </div>
  );
}
