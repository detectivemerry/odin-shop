"use client";

import Image from "next/image";
import deleteLogo from "./delete_logo.png";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { isValidQuantity } from "../lib/validation";
import { useSession } from "next-auth/react";
import { updateCartItemQuantity,  deleteCartItem } from "@/app/lib/cartItems"

export default function CartItem({ id, setPrices, setMessage }) {
  const { data : context, update } = useSession();
  const [selectedQuantity, setSelectedQuantity] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function removeCartItem() {
    setErrorMessage("");
    const {error, data} = await deleteCartItem(id)
    
    if(error)
      setMessage({type : "error", content : data.message})
    else{
      update()
      setPrices((prevPrices) => prevPrices.filter((price) => price.id != id))
      setMessage({type : "message", content : data.message})
    }
  }

  function handleSelectQuantity(e) {
    e.preventDefault();
    setErrorMessage("");
    setCurrentQuantity(e.target.value);
    setSelectedQuantity(true);
  }

  async function handleChangeQuantity(e) {
    setErrorMessage("");

    if (!isValidQuantity(currentQuantity)){
      setErrorMessage("Please enter a valid quantity!");
      return
    }

    //remove product or update depending on whether new quantity is zero
    const {error, data} = currentQuantity != 0 ? await updateCartItemQuantity(id, currentQuantity) : await deleteCartItem(id);

    if(error)
      setMessage({type : "error", content : data.message})
    else{
      update()
      setPrices((prevPrices) => prevPrices.filter((price) => price.id != id))
      setMessage({type : "message", content : data.message})
    }

    setSelectedQuantity(false);
    setCurrentQuantity(currentItem.quantity);
  }

  function handleCancelChange(e) {
    e.preventDefault();
    setErrorMessage("");
    setSelectedQuantity(false);
    setCurrentQuantity(currentItem.quantity);
  }

  // populate cart item details
  useEffect(() => {
    const itemContext = context.cartItems.find((item) => item.product_id == id);
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((json) => json.json())
      .then((res) => {
        res.quantity = itemContext.quantity;
        setCurrentItem(res);
        setCurrentQuantity(res.quantity);
        // update total cost
        setPrices((prevPrices) => {
          const newPrices = prevPrices.filter((price) => price.id != id);
          newPrices.push({ id: id, total: res.price * res.quantity });
          return newPrices;
        });
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [])

  // update item's quantity according to user session 
  useEffect(() => {
    const itemContext = context.cartItems.find((item) => item.product_id == id);
    if(itemContext.quantity != currentQuantity){
      setCurrentItem((prevItem) => {
        return {...prevItem, quantity : itemContext.quantity}
      })
      setCurrentQuantity(itemContext.quantity);

      // update total cost
      setPrices((prevPrices) => {
        const newPrices = prevPrices.filter((price) => price.id != id);
        newPrices.push({ id: id, total: currentItem.price * itemContext.quantity});
        return newPrices;
      });
    }
  }, [context.cartItems])

  return (
    <div className = "bg-white shadow-md flex flex-row h-auto lg:h-40 w-[95vw] lg:w-auto p-2 rounded-lg text-xs lg:text-base justify-around">
      <div>
          <Link href = {`/Products/${id}`} className = "h-full w-20 lg:w-40 flex flex-col items-center">
            {isLoading? <>Loading...</> : 
              <Image
                src={currentItem.image}
                alt={`Image for ${currentItem.title}`}
                width = {0}
                height = {0}
                quality = {100}
                sizes = "100vw"

                style={{ width: "auto", height: "100%" }}
              />
            }
          </Link>
      </div>
      <div className = "flex flex-row items-center px-2 font-medium w-12 lg:w-96 ">
        {isLoading? <>Loading...</> : 
        <Link href = {`/Products/${id}`}>{currentItem.title}</Link>
        }
      </div>
      <div className = "flex flex-col justify-center ml-1 w-12 lg:w-40 px-2">
        <div className="flex flex-row justify-center">
          {isLoading? <>Loading...</> : <>
            <input
              value={currentQuantity}
              onChange={handleSelectQuantity}
              type="number"
              className="w-full text-center w-20"
            />
          </>}
        </div>
        { !isLoading &&
          selectedQuantity ? 
          <div>
            <div>
              {errorMessage != "" && <p className = "text-red-500 text-xs text-center">{errorMessage}</p>}

              {currentQuantity >= 20 && (
                <p className="text-red-500 text-xs text-center">Maximum quantity is 20</p>
              )}
            </div>
            <div className="flex flex-row gap-1 py-2 justify-center flex-wrap">
              <button
                onClick={handleChangeQuantity}
                className="bg-green-500 hover:bg-green-600 border-2 text-white p-1 rounded"
              >
                confirm
              </button>
              <button
                onClick={handleCancelChange}
                className="bg-red-500 hover:bg-red-600 border-2 text-white p-1 rounded"
              >
                cancel
              </button>
            </div>
          </div> : <></>
        }
      </div>
      <div className = "flex flex-col justify-center lg:px-6 lg:w-32">
        {isLoading ? <>Loading...</> : <>
          ${(Math.round(currentItem.price * currentItem.quantity * 100) / 100).toFixed(2)}
        </>}
      </div>
      <div className = "flex flex-col justify-center lg:pl-6 lg:pr-8">
        <button className="hover:scale-125" onClick={removeCartItem}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
}
