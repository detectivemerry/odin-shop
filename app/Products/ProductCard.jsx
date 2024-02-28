import React from "react";
import Image from "next/image";
import Link from "next/link"

export default function ProductCard({ product }) {

  return (
    <Link href = {`/Products/${product.id}`}>

    <div className="m-4 p-4 shadow-2xl flex bg-teal-50 flex flex-col items-center justify-between hover:scale-125 border-2 w-64 h-96">
      <div className="border-2 h-4/6 w-full flex flex-col items-center justify-center">
        <Image
          src={product.image}
          alt={`Image of ${product.title}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "80%" }}
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
