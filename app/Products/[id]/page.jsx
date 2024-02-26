"use client"

import React from "react";
import Image from "next/image";
import { useState } from "react";

export const dynamicParam = true;

// pre-render all product details all the possible product ids
// returning smth like this [{id: '1'}, {id : '2'}, ...]
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return products.map((product) => {
    id: product.id;
  });
}

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}


export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);
  const [ count, setCount ] =  useState(0);

function selectOperator(e, operator){
    e.preventDefault();
    if(operator === '+'){
        setCount((prevCount) => prevCount += 1)
    }
    else{
        setCount((prevCount) => prevCount -= 1)
    }
    
}
  return (
    <div className="flex flex-row mx-32 my-16">
      <div className="border-2 w-96 flex flex-col  justify-center items-center flex-2 bg-white">
        <Image
          src={product.image}
          alt={`Image of ${product.title}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "80%", height: "auto" }}
        />
      </div>
      <div className="flex flex-col border-2 flex-1 gap-y-4 bg-white px-10 py-5">
        <div className="text-teal-800 text-2xl">{product.title}</div>

        <div className="text-white bg-teal-800 rounded w-max p-1">
          {product.category}
        </div>

        <div>{product.description}</div>

        <div className="text-teal-700 font-bold text-xl">
          $SGD {product.price}
        </div>
        <div className="flex flex-col items-center gap-y-4 pt-5">
          <div className = "flex flex-row gap-1 justify-center h-9">
            <button className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900">
              -
            </button>
            <div>
              <input className="w-24 h-8 text-center" value = {count}></input>
            </div>
            <button className="bg-teal-700 text-white text-3xl font-bold w-12 rounded hover:bg-teal-900">
              +
            </button>
          </div>

          <div>
            <button className = "bg-white text-teal-700 border-2 border-teal-700 rounded hover:bg-teal-900 p-1">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
