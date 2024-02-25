import React from "react";
import ProductCard from "./ProductCard";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

export default async function ProductList() {
  const products = await getProducts();
  return (
    <div>
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
