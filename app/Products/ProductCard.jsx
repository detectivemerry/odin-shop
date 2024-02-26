"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"

export default function ProductCard({ product }) {
  const [addedToCart, setAddedToCart] = useState(false);

  const toggleAddedToCart = (e) => {
    e.preventDefault();
    setAddedToCart((prevAddedToCart) => !prevAddedToCart);
  };

  // <div>
  //   {!addedToCart && (
  //     <button className="bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-full" onClick = {toggleAddedToCart}>
  //       Add to cart
  //     </button>
  //   )}
  //   {addedToCart && <AddToCartMenu toggleAddedToCart = {toggleAddedToCart} />}
  // </div>
  //  useEffect(()=>{
  //
  //  }, [addedToCart])

  return (
    <Link href = {`/Products/${product.id}`}>

    <div className="m-4 p-4 shadow-2xl flex bg-teal-50 flex flex-col items-center justify-between hover:scale-125 border-2 w-64 h-96">
      <div className="border-2 h-4/6 w-full flex flex-col items-center justify-center">
        <Image
          src={product.image}
          alt={`Image of ${product.title}`}
          width={80}
          height={160}
        />
      </div>
      <div>
        {product.title.slice(0, 40)} {product.title.length > 40 && <>...</>}
      </div>
      <div className="text-teal-700 font-bold">$SGD {product.price}</div>
    </div>
    </Link>
  );
}
