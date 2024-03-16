"use client";

import Image from "next/image";
import deleteLogo from "./delete_logo.png";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { isValidQuantity } from "../lib/validation";
import { useSession } from "next-auth/react";
import { updateCartItemQuantity,  deleteCartItem } from "@/app/lib/cartItems"

export default function CartItem({ id, setPrices, setMessage }) {
  //const context = useContext(AppContext);
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
      setErrorMessage("Please enter a valid quantity");
      return
    }
    
    const {error, data} = await updateCartItemQuantity(id, currentQuantity);

    if(error)
      setMessage({type : "error", content : data.message})
    else{
      update()
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
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((json) => json.json())
      .then((res) => {
        const itemContext = context.cartItems.find((item) => item.product_id == id);
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
  }, [context.cartItems]);

  return (
    <div className="flex flex-row mx-3">
      <div className="flex-[2_1_0%] border-2 border-teal-700 border-t-0 p-1 flex flex-col items-center h-36">
        {isLoading ? (
          <p>Loading ... </p>
        ) : (
          <Image
            src={currentItem.image}
            alt={`Image for ${currentItem.title}`}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "80%" }}
          />
        )}
      </div>
      <div className="flex-[3_1_0%] border-2 border-l-0 border-teal-700 border-t-0 p-1 flex flex-col justify-center underline text-blue-700">
        <Link href={`/Products/${id}`}>
          {isLoading ? <p>Loading ... </p> : currentItem.title}
        </Link>
      </div>
      <div className=" flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center items-center">
        {isLoading ? (
          <p>Loading ... </p>
        ) : (
          <>
            <input
              value={currentQuantity}
              className="w-full text-center w-6/12"
              onChange={handleSelectQuantity}
              max="20"
              pattern="[0-9\s]{1,2}"
            />
            {selectedQuantity && (
              <>
                <div>
                  {errorMessage != "" && <p className = "text-red-500 text-sm">Please enter a valid quantity</p>}

                  {currentQuantity >= 20 && (
                    <p className="text-red-500 text-sm">Maximum quantity is 20</p>
                  )}
                </div>
                <div className="flex flex-row gap-1 py-2">
                  <button
                    onClick={handleChangeQuantity}
                    className="bg-green-600 border-2 text-white p-1"
                  >
                    confirm
                  </button>
                  <button
                    onClick={handleCancelChange}
                    className="bg-red-600 border-2 text-white p-1"
                  >
                    cancel
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center">
        $
        {isLoading ? (
          <>Loading ... </>
        ) : (
          (Math.round(currentItem.price * 100) / 100).toFixed(2)
        )}
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center">
        $
        {isLoading ? (
          <>Loading ... </>
        ) : (
          (
            Math.round(currentItem.price * currentItem.quantity * 100) / 100
          ).toFixed(2)
        )}
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center items-center">
        <button className="hover:scale-125" onClick={removeCartItem}>
          <Image src={deleteLogo} alt="dustbin logo" height={60} width={20} />
        </button>
      </div>
    </div>
  );
}
