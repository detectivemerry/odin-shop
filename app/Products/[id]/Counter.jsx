"use client";

import { AppContext } from "@/app/context/App.context";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { isValidQuantity } from "@/app/lib/validation";
import Link from "next/link"

export default function Counter({ id }) {

  const [count, setCount] = useState(0);
  const [productInCart, setProductInCart] = useState(false)
  const [error, setError] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(0)

  const handleChange = (operator) => (e) => {
    e.preventDefault();
    setCount((prevCount) => {
      let currentCount = Number(prevCount)
      if (operator === "+") {
        currentCount += 1
        if(!isValidQuantity(currentCount)){
          currentCount = prevCount
        }
      } 
      else if( operator === "-"){ 
        currentCount -= 1
        if(!isValidQuantity(currentCount)){
          currentCount = prevCount
        }
      }
      else{ //text input
        currentCount = e.target.value;
      }
      return currentCount 
    })
  }

  const context = useContext(AppContext)

  // Retrieve quantity for item if already in cart
  useEffect(() => {
    context.cartItems.forEach((item) => {
      if(item.id === id){
        setCurrentQuantity(item.quantity)
        setCount(item.quantity)
        setProductInCart(true)
      }
    })
  }, [context.cartItems])

  function handleSubmit(e){
    e.preventDefault();
    setError(false)

    // count is not number or in range
    if(!isValidQuantity(count)){
      setError(true)
      setCount(currentQuantity)
      return
    }
    
    // remove product from cart
    if(productInCart && count == 0){
      context.setCartItems((prevCartItems) => {
        return prevCartItems.filter((item) => item.id != id)
      })
      setCount(0)
      setProductInCart(false)
    }
    else if(productInCart){
      context.setCartItems((prevCartItems) => {
                  const newCartItems = prevCartItems.map((item) => {
                      if(item.id == id){
                          item.quantity = count
                      }
                      return item
                  })
                  return newCartItems;
              })
    }
    else{ // product not already in cart
      context.setCartItems((prevCartItems) => [...prevCartItems, {id : id, quantity : count}])
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-4 pt-5">
      {productInCart &&
      <p>Number of items already in cart:</p>}
      <div className="flex flex-row gap-1 justify-center">
        <button
          className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
          onClick={handleChange("-")}
        >
          -
        </button>
        <div>
          <input className="w-24 h-8 text-center" value={count} onChange = {handleChange("")}></input>
        </div>

        <button
          className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
          onClick={handleChange("+")}
        >
          +
        </button> 
      </div>
      
      {count >= 20 && <p className = "text-red-600">20 is the maximum quantity allowed per product.</p> }

      {error &&
        <div>
          <p className = "text-red-600">Please enter a valid quantity!</p>
        </div>
      }

      <div className = "flex flex-col items-center gap-2">
        <button className="bg-white text-teal-700 border-2 border-teal-700 rounded hover:bg-teal-900 p-1"
        onClick = {handleSubmit}>
          {productInCart ? <>Update quantity in Cart</> : <>Add product to Cart</>}
       </button>

        <p className = "underline text-blue-700"><Link href = "/Products">Click here to continue browsing</Link></p>
        <p className = "underline text-blue-700"><Link href = "/Cart">Click here to view Cart</Link></p>
      </div>

    </div>
  );
}
