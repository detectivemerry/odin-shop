"use client";

import React from "react";
import { useState, useEffect } from "react";
import { isValidQuantity } from "@/app/lib/validation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  deleteCartItem,
  updateCartItemQuantity,
  addCartItem,
} from "@/app/lib/cartItems";

export default function Counter({ id }) {
  const [count, setCount] = useState(0);
  const [productInCart, setProductInCart] = useState(false);
  const [error, setError] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (operator) => (e) => {
    e.preventDefault();
    setCount((prevCount) => {
      let currentCount = Number(prevCount);
      if (operator === "+") {
        currentCount += 1;
        if (!isValidQuantity(currentCount)) {
          currentCount = prevCount;
        }
      } else if (operator === "-") {
        currentCount -= 1;
        if (!isValidQuantity(currentCount)) {
          currentCount = prevCount;
        }
      } else {
        //text input
        currentCount = e.target.value;
      }
      return currentCount;
    });
  };

  // const context = useContext(AppContext)
  const { data: context, status, update } = useSession();

  // Retrieve quantity for item if already in cart
  useEffect(() => {
    context && context.cartItems.forEach((item) => {
      if (item.product_id === id) {
        setCurrentQuantity(item.quantity);
        setCount(item.quantity);
        setProductInCart(true);
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    // count is not number or in range
    if (!isValidQuantity(count)) {
      setError(true);
      setCount(currentQuantity);
      return;
    }

    // remove product from cart
    if (productInCart && count == 0) {
      const { error, data } = deleteCartItem(id);
      if (!error) {
        update();
        setCount(0);
        setProductInCart(false);
      }
    } else if (productInCart) {
      const { error, data } = updateCartItemQuantity(id, count);
      if (!error) {
        update();
        setProductInCart(true);
      }
    } else if (count > 0){
      // product not already in cart
      const { error, data } = addCartItem(id, count);
      if (!error) {
        update();
        setProductInCart(true);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-4 pt-5">
      {status == "authenticated" ? (
        <>
          {productInCart && <p>Number of items already in cart:</p>}
          <div className="flex flex-row gap-1 justify-center">
            <button
              className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
              onClick={handleChange("-")}
            >
              -
            </button>
            <div>
              <input
                className="w-24 h-8 text-center"
                value={count}
                onChange={handleChange("")}
              ></input>
            </div>

            <button
              className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
              onClick={handleChange("+")}
            >
              +
            </button>
          </div>

          {count >= 20 && (
            <p className="text-red-600">
              20 is the maximum quantity allowed per product.
            </p>
          )}

          {errorMessage && (
            <div>
              <p className="text-red-600">{errorMessage}</p>
            </div>
          )}
          {error && (
            <div>
              <p className="text-red-600">Please enter a valid quantity!</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-2">
            <button
              className="bg-white text-teal-700 border-2 border-teal-700 rounded hover:bg-teal-900 p-1"
              onClick={handleSubmit}
            >
              {productInCart ? (
                <>Update quantity in Cart</>
              ) : (
                <>Add product to Cart</>
              )}
            </button>

            <p className="underline text-blue-700 text-center">
              <Link href="/Products">Click here to continue browsing</Link>
            </p>
            <p className="underline text-blue-700">
              <Link href="/Cart">Click here to view Cart</Link>
            </p>
          </div>
        </>
      ) :
      <>
        { status == "loading" ? <>
          <p> Loading... </p>
          </>
          :
        <>
          <p> You have to be logged in to add items to your cart!</p>
          <p> Log in or sign up <Link href = "/Login" className = "text-blue-500">here</Link>!</p>
        </>
        }
      </> 
      }
    </div>
  );
}
