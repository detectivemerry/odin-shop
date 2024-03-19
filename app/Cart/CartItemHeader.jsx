import React from 'react'
import clsx from 'clsx';

export default function CartItemHeader({message}) {
  return (
    <>
    {
        message.type != "" ? <p className ={clsx(
        "p-2 text-center",
        {
            'text-red-500' : message.type === 'error',
            'text-teal-600' : message.type == 'message'
        },
        )}
        >{message.type}:  {message.content}</p> : <></>
    }
    <div className = "flex flex-row mx-3">
        <div className = "flex-[2_1_0%] border-2 border-teal-700 p-1">
            Product
        </div>
        <div className = "flex-[3_1_0%] border-2 border-l-0 border-teal-700 p-1">
            Title
        </div>
        <div className = " flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
           Quantity 
        </div>
        <div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            Unit price
        </div>
        <div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            Total
        </div>
        <div className = "flex-[1_1_0%] border-2 border-teal-700 border-l-0 p-1 text-center">
            Delete item
        </div>

    </div>
    </>

  )
}
