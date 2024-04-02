"use client"

import Link from "next/link";
import { useState, useEffect} from "react"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export default function page() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage] = useState("")
    const router  = useRouter();
    const { data : session, status } = useSession();

    useEffect(() => {
      if(status === "authenticated") router.push('/')
    }, [status])

    async function authenticate(e){
      e.preventDefault();
      setErrorMessage("");
      await signIn('credentials', {email, password, redirect : false})
      .then((res) => {
        if(res && res.ok){
          router.push('/')
        }
        else if(res && res.error == "CredentialsSignin")
          setErrorMessage("Sign in failed. Check the details you provided are correct.")
        else{
          setErrorMessage("Unable to sign in.")
        }
      })
      .catch((error) => {
        console.error(error)
      })
    }

  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Login to Account</div>
      {
        errorMessage != "" &&
        <div className = "text-red-500 text-center">
          Error:<br/>
          {errorMessage}
        </div>
      }
      <div className = "flex flex-col gap-2">
        <div className = "">
          Email:   
        </div>
        <div className = "">
          <input label="email" className = "rounded" onChange = {(e) => {setEmail(e.target.value)}}></input>
        </div>
        <div className = "">
          Password:
        </div>
        <div className = "">
          <input label="password" className = "rounded" onChange = {(e) => {setPassword(e.target.value)}} type = "password"></input>
        </div>
        </div>

        <div className = "">
          <button className = "bg-teal-700 text-white p-1 rounded"
          onClick={authenticate}>Login</button>
        </div>
      <div>
        Do not have an account yet? Sign up <Link href="/Register" className = "underline text-teal-700">here!</Link>
      </div>
    </div>
  );
}