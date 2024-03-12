import React from "react";
import ProductCard from "./ProductCard";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: {
      revalidate: 60,
    },
  }).catch((error) => {
    console.error(error)
  });

  return res.json();
}

export default async function ProductList() {
  const products = await getProducts();
  return (
    <div className = "flex flex-row flex-wrap justify-center mx-32">
      {products &&
        products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}

      {products.length === 0 && (
        <p className="text-center">There are no products.</p>
      )}
    </div>
  );
}
