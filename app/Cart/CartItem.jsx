"use client";

import Image from "next/image";
import deleteLogo from "./delete_logo.png";
import { AppContext } from "@/app/context/App.context";
import React, { useContext } from "react";

export default function CartItem({ cartItem, setCartItems }) {
  const { id, image, title, price, quantity } = cartItem;

  const context = useContext(AppContext);

  function deleteCartItem() {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id != id)
    );
  }

  //function changeCartItemQuantity(e) {
  //  e.preventDefault();
  //  console.log(e.target.value);
  //  context.setCartItems((prevCartItems) => {
  //      const res = prevCartItems.map((item) => {
  //          if(item.id == id){
  //              item.quantity = 5
  //          }
  //      })
  //      return res
  //  })
  //}

  return (
    <div className="flex flex-row mx-3">
      <div className="flex-[2_1_0%] border-2 border-teal-700 border-t-0 p-1 flex flex-col items-center h-36">
        <Image src={image} alt={`Image for ${title}`} 
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "80%" }}
         />
      </div>
      <div className="flex-[3_1_0%] border-2 border-l-0 border-teal-700 border-t-0 p-1 flex flex-col justify-center">
        {title}
      </div>
      <div className=" flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center items-center">
        <input value={quantity} className="w-full text-center w-6/12" />
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center">
        ${price}
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center">
        ${price * quantity}
      </div>
      <div className="flex-[1_1_0%] border-2 border-teal-700 border-l-0 border-t-0 p-1 text-center flex flex-col justify-center items-center">
        <button className="hover:scale-125" onClick={deleteCartItem}>
          <Image src={deleteLogo} alt="dustbin logo" height={60} width={20} />
        </button>
      </div>
    </div>
  );
}
