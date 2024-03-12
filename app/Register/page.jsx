"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidEmail } from '../lib/validation';

export default function page() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("")
  const [registered, setRegistered] = useState(false)
  const router = useRouter();

  async function handleSubmit(e){
   e.preventDefault();
   setError("")
    if(!isValidEmail(email)){
      setError("Please enter a valid email.")
      return
    }
    await fetch("/api/register", {
    method : "POST",
    headers : {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({email : email, password : password})
   }) 
   .then((res) => {
    if(res.status == 200){
      setRegistered(true)
    }
    else{
      setError(`Failed to create user. ${res.errorMessage}`)
    }
   })
   .catch((error) => {
    setError(`An exception has occured,${error}`)
   })
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Create an Account</div>
      {registered ? <p> New account has been created. Click <Link href = "/Login">here</Link> to login.</p>
      : <></>}
      <div>
        email:   
        <input label="email" className = "rounded" onChange = {(e) => {setEmail(e.target.value)}} required = {true}></input>
      </div>
      <div>
        Password:
        <input label="password" className = "rounded" onChange = {(e) => {setPassword(e.target.value)}} type = "password" required = {true}></input>
      </div>
      {error != "" ? 
        <div>
          <p className = "text-red-700">{error}</p>
        </div>
      : <></>}
      <div>
        <button className = "bg-teal-700 text-white p-1 rounded"
        onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}
