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
  const [cartItems, setCartItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let initialLoadDone = false;

  function computeCartTotal() {
    let res = 0;
    cartItems.forEach((cartItem) => {
      res += cartItem.quantity * cartItem.price;
    });
    return res;
  }

  // fetch cart item details
  useEffect(() => {
    if (!initialLoadDone) {
      setIsLoading(true);

      context.cartItems.map((cartItem) => {
        fetch(`https://fakestoreapi.com/products/${cartItem.id}`)
          .then((res) => res.json())
          .then((json) => {
            json.quantity = cartItem.quantity;
            setCartItems((prevCartItems) => [...prevCartItems, json]);
          });
      });

      setIsLoading(false);
      initialLoadDone = true;
    }
  }, []);

  return (
    <div className="mx-32 bg-teal-300 flex flex-col my-16">
      <div className="text-3xl border-b-4 border-black py-3">Cart Summary</div>
      <div>
        {cartItems.length > 0 && (
          <>
            <ProgressMenu />
            <CartItemHeader />
          </>
        )}
        {!isLoading &&
          cartItems.length > 0 &&
          cartItems.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                setCartItems={setCartItems}
              />
            );
          })}
        {cartItems.length > 0 && (
          <div className="p-3 float-right flex flex-col justify-center gap-3">
            <div className="text-2xl text-center">Total: ${computeCartTotal()}</div>
            <div>
              <button className = "border-2 border-teal-900 bg-teal-700 text-white rounded p-1 hover:bg-teal-400 hover:border-teal-400 hover:text-teal-700">Proceed to checkout</button>
            </div>
          </div>
        )}
        {cartItems.length === 0 && (
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
