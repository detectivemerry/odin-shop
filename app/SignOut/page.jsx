"use client"

import React from 'react'
import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Sign out</div>
      <div>
        <button className = "bg-teal-700 text-white p-1 rounded"
          onClick={() => signOut({callbackUrl : "/"})}>Confirm sign out</button>
      </div>
    </div>
  );
}
