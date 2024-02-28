"use client"

import React from "react";
import Image from "next/image"

export default function CartItem({ image, title, price, quantity }) {

  return (
    <div className = "flex flex-row">
      <div>
        <Image
          src={image}
          alt={`Image for ${title}`}
          height={180}
          width={90}
        />
      </div>

      <div>{title}</div>

      <div>{price}</div>

      <div>{quantity}</div>
    </div>
  );
}
