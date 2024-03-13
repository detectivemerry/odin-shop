"use client"
import React, { useState } from 'react'
import { isValidEmail, isValidRegisterForm } from '../lib/validation';
import Link  from 'next/link'

export default function page() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [errors, setErrors] = useState([])
  const [registered, setRegistered] = useState(false)

  async function handleSubmit(e){
   e.preventDefault();
   setErrors([]);
   const formData = {username : username, email : email, password : password}

   const errorMessages = isValidRegisterForm(formData)
    if(errorMessages.length > 0){
      setErrors(errorMessages)
      return
    }

    await fetch("/api/register", {
    method : "POST",
    headers : {
      "Content-Type": "application/json"
    },
    body : JSON.stringify(formData)
   }) 
   .then((obj) => obj.json())
   .then((res) => {
    if(res.status == 200){
      setRegistered(true)
    }
    else{
      setErrors((prevErrors) => {
        return [ ...prevErrors, `Failed to create user. ${res.errorMessage}`]
      })
    }
   })
   .catch((error) => {
      setErrors((prevErrors) => {
        return [ ...prevErrors, `An exception has occured,${error}`]
      })
   })
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Create an Account</div>
      {registered ? 
        <div className="text-teal-900"> 
          New account has been created. Click <Link href = "/Login" className = "underline text-blue-700">here</Link> to login now!
        </div>
      : <></>}
      <div>
        username:   
        <input label="email" className = "rounded" onChange = {(e) => {setUsername(e.target.value)}} required = {true}></input>
      </div>
      <div>
        email:   
        <input label="email" className = "rounded" onChange = {(e) => {setEmail(e.target.value)}} required = {true}></input>
      </div>
      <div>
        Password:
        <input label="password" className = "rounded" onChange = {(e) => {setPassword(e.target.value)}} type = "password" required = {true}></input>
      </div>

      <div className = "text-center text-red-500">
      {errors.length > 0 &&
      <>
      <p>Error!</p>
      <ul>
      {
        errors.map((error) => {
          return(
            <li key = {error}>{error}</li>
          )
        })
      }
      </ul>
      </>
      }
        </div>

      <div>
        <button className = "bg-teal-700 text-white p-1 rounded"
        onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}
