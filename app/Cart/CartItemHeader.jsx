import React from 'react'

export default function CartItemHeader() {
  return (
    <div className = "flex flex-row mx-3">
        <div className = " border-2 border-teal-700">
            Product
        </div>
        <div className = " border-2 border-teal-700">
            Title
        </div>
        <div className = " border-2 border-teal-700">
            Unit price
        </div>
        <div className = " border-2 border-teal-700">
            Total
        </div>
        <div className = " border-2 border-teal-700 ">
            Delete item
        </div>

    </div>
  )
}
