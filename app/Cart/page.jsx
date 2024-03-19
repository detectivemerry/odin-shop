"use client";

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "@/app/context/App.context";
import Link from "next/link";
import ProgressMenu from "./ProgressMenu";
import CartItem from "./CartItem";
import CartItemHeader from "./CartItemHeader";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: context, status} = useSession();

  const [prices, setPrices] = useState([]); // [{id : "2", price : "32"}]
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState({ type: "", content: "" });

  // update total price
  useEffect(() => {
    let currentTotalPrice = 0;
    prices.forEach((price) => {
      currentTotalPrice += price.total;
    });
    setTotalPrice(Math.round(currentTotalPrice * 100) / 100);
  }, [prices]);

  return (
    <div className="mx-32 bg-teal-300 flex flex-col my-16">
      <div className="text-3xl border-b-4 border-black py-3">Cart Summary</div>
      <div>
        {context && status != "unauthenticated" ? (
          <>
            {context.cartItems.length > 0 && (
              <>
                <ProgressMenu />
                <CartItemHeader message={message} />
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
                <div className="p-3 float-right flex flex-col justify-center gap-3">
                  <div className="text-2xl text-center">
                    Total: ${(Math.round(totalPrice * 100) / 100).toFixed(2)}
                  </div>
                  <div>
                    <Link href="/Checkout">
                      <button className="border-2 border-teal-300 bg-teal-400 text-teal-700 rounded p-1 hover:bg-teal-700 hover:border-teal-700 hover:text-teal-200">
                        Proceed to checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {context.cartItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-2xl">Cart is currently empty.</p>
                <p className="text-xl">
                  Browse for more items{" "}
                  <Link className="text-blue-500 underline " href="/Products/">
                    here
                  </Link>
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-2xl text-center mt-10">
          {
            !context ? 
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
  );
}
