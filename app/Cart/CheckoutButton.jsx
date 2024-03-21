import React from 'react'
import Link from 'next/link';
import clsx from 'clsx';

export default function CheckoutButton( {disabled} ) {
  return (
    <Link href = "/Checkout">
        <button className = {clsx("bg-emerald-300 rounded p-1 w-full font-bold", {
            "hover:bg-emerald-600" : !disabled,
        })}
        disabled = {disabled}
        >Checkout</button>
    </Link>
  )
}
