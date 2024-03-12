"use client"
import React from "react";
import Link from "next/link";
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function page() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    // hard coded login
//    setEmail("jsmith@email.com")
    //setPassword(1234)

  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Login to Account</div>
      <div>
        email:   
        <input label="email" className = "rounded" onChange = {(e) => {setEmail(e.target.value)}}></input>
      </div>
      <div>
        Password:
        <input label="password" className = "rounded" onChange = {(e) => {setPassword(e.target.value)}} type = "password"></input>
      </div>
      <div>
        <button className = "bg-teal-700 text-white p-1 rounded"
        onClick={() => signIn('credentials', {email, password, callbackUrl : "localhost:3000/"})}>Login</button>

      </div>
      <div>
        Do not have an account yet? Sign up <Link href="/Register" className = "underline text-teal-700">here!</Link>
      </div>
    </div>
  );
}
