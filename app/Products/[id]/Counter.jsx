"use client";

import { AppContext } from "@/app/context/App.context";
import React, { useContext } from "react";
import { useState } from "react";
import Link from "next/link"

export default function Counter({ id }) {
  const [count, setCount] = useState(0);
  const [addedToCart, setAddedToCard] = useState(false);

  const handleOperator = (operator) => (e) => {
    e.preventDefault();
    if (operator === "+") {
      setCount((prevCount) => (prevCount += 1));
    } else {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          return 0;
        }
      });
    }
  };

  const context = useContext(AppContext)

  function handleSubmit(e){
    e.preventDefault();
    let product = context.cartItems.find(x => x.id == id)

    if(product == null){ // product not in cart
        context.setCartItems((prevCartItems) => [...prevCartItems, {id : id, quantity : count}])
    }
    else{ // product in cart
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
    setAddedToCard(true) 
  }

  return (
    <div className="flex flex-col items-center gap-y-4 pt-5">
      <div className="flex flex-row gap-1 justify-center h-9">
        <button
          className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
          onClick={handleOperator("-")}
          disabled = {addedToCart}
        >
          -
        </button>
        <div>
          <input className="w-24 h-8 text-center" disabled = {addedToCart} value={count} onChange = {(e)=>setCount(e.target.value)}></input>
        </div>

        <button
          className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900"
          onClick={handleOperator("+")}
          disabled = {addedToCart}
        >
          +
        </button>
      </div>

      <div>
        {!addedToCart &&
        <button className="bg-white text-teal-700 border-2 border-teal-700 rounded hover:bg-teal-900 p-1"
        onClick = {handleSubmit}>
          Add to Cart
       </button>
        }

        {addedToCart &&
        <div className = "flex flex-col gap-5 items-center">
        <button className="bg-white text-teal-700 border-2 border-teal-700 rounded p-1 w-24"
        onClick = {handleSubmit} disabled = {true}>
          Added to Cart!
       </button>
       
        <p className = "underline text-teal-600"><Link href = "/Products">Click here to continue browsing</Link></p>
        <p className = "underline text-teal-600"><Link href = "/Cart">Click here to view Cart</Link></p>
        </div>
        }
      </div>

    </div>
  );
}
