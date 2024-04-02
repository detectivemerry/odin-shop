'use client'

import React from 'react'
import ProductList from './ProductList'

export default function () {

  return (
    <div className = "flex-col">
      <div className = "text-center text-3xl my-12 lg:m-[10vh] underline decoration-orange-800">
        Error
      </div>
      <div className = "text-center">
        <p> Internal Server Error. Please try again later</p>
      </div>
    </div>
  )
}
