"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

export default function ProductCard({product}) {
  const [ selectedCart, setSetSelectedCart] = useState(false)

  const toggleSelectCart = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <div><Image src = {product.image} alt = {`Image of ${product.title}`} /></div>
    </div>
  )
}
