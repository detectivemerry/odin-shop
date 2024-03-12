import React from "react";
import Image from "next/image";
import Counter from './Counter.jsx'
// import { useState } from "react";

export const dynamicParam = true;

// pre-render all product details all the possible product ids
// returning smth like this [{id: '1'}, {id : '2'}, ...]
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products")
  .catch((error) => {
    console.error(error)
  })
  
  const products = await res.json();
  return products.map((product) => {
    id: product.id;
  })
  
}

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: {
      revalidate: 60,
    },
  })
  .catch((error)=> {
    console.error(error)
  });
  return res.json();
}


export default async function ProductDetails({ params }) {
  const product = await getProduct(params.id);
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
          $SGD {(Math.round(product.price* 100) / 100).toFixed(2)}
        </div>
        <Counter id = {product.id} />
      </div>
    </div>
  );
}
