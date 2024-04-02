import React from 'react'
import ProductList from './ProductList'

export default function products() {

  return (
    <div className = "flex-col">
      <div className = "text-center text-7xl my-12 lg:m-[10vh] underline decoration-orange-800">
        Products
      </div>
      <div>
        <ProductList/>
      </div>
    </div>
  )
}
