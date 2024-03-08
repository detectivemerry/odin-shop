"use client";

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "@/app/context/App.context";
import Link from "next/link";
import ProgressMenu from "./ProgressMenu";
import CartItem from "./CartItem";
import CartItemHeader from "./CartItemHeader";

//1. fetch all items one by one TO component usestate
//2. display (title, quantity)
//3. users can either remove object or change quantity, reflected on component use state ONLY
//4. changes user made are reflected correctly
//5. before component unmount, update context using clean up function

export default function page() {
  const context = useContext(AppContext);

  const [ prices, setPrices ] = useState([]) // [{id : "2", price : "32"}]
  const [totalPrice, setTotalPrice] = useState(0)

  // update total price
  useEffect(()=> {
    let currentTotalPrice = 0
    prices.forEach((price) => { currentTotalPrice += price.total})
    setTotalPrice(Math.round(currentTotalPrice * 100) / 100)
  }, [prices])

  return (
    <div className="mx-32 bg-teal-300 flex flex-col my-16">
      <div className="text-3xl border-b-4 border-black py-3">Cart Summary</div>
      <div>
        {context.cartItems.length > 0 && (
          <>
            <ProgressMenu />
            <CartItemHeader />
          </>
        )}
        {
          context.cartItems.length > 0 &&
          context.cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} id ={cartItem.id} setPrices = {setPrices} />;
          })}
        {context.cartItems.length > 0 && (
          <div className="p-3 float-right flex flex-col justify-center gap-3">
            <div className="text-2xl text-center">
              Total: {totalPrice}
            </div>
            <div>
              <Link href = "/Checkout">
                <button className="border-2 border-teal-300 bg-teal-400 text-teal-700 rounded p-1 hover:bg-teal-700 hover:border-teal-700 hover:text-teal-200">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        )}
        {context.cartItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl">Cart is currently empty.</p>
            <p className="text-xl">
              Browse for more items{" "}
              <Link className="text-blue-500 underline" href="/Products/">
                here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
