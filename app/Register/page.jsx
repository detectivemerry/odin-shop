"use client"
import { isValidEmail, isValidRegisterForm } from '../lib/validation';
import Link  from 'next/link'
import register from "@/app/lib/register"
import { useState, useEffect } from 'react';
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation"
import Notification from "../api/(components)/Notification";

export default function page() {

  const [message, setMessage] = useState({ type: "", content: "" });
  const [registered, setRegistered] = useState(false);

  const { data : session, status } = useSession();
  const router  = useRouter();

  useEffect(() => {
    if(status === "authenticated") router.push('/')
  }, [status])

  async function onSubmit(formData){
    setMessage({type : '', content: ''});

    const test = { username : formData.get('username'), email : formData.get('email'), password : formData.get('password')}
    const errorMessages = isValidRegisterForm(test)
    
    if(errorMessages.length > 0){
      let errorMessage = "";
      errorMessages.forEach((msg) => {errorMessage = errorMessage + msg + '\n'});
      setMessage({type : "error", content : errorMessage})
      return
    }
    
    const {error, message} = await register(formData);

    if(error)
      setMessage({type : "error", content: message})
    else{
      setRegistered(true);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Create an Account</div>

      <div>
        <Notification message = {message} setMessage={setMessage}/>
      </div>

      <form className = "flex flex-col gap-2 items-end" action = {onSubmit}> 
          <div>
          <label htmlFor="username">Username:</label>
            <input name = "username" className = "rounded" required></input>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name = "email" className = "rounded" required></input>
          </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input label="password" name = "password" className = "rounded" type = "password" required></input>
        </div>

        <div className = "flex justify-center w-full">
          <button className = "bg-teal-700 text-white p-1 rounded" type = "submit">Register</button>
        </div>
      </form>
      <div>
        {registered && <>New account has been created. Click <Link href = "/Login" className = "underline text-blue-700">here</Link> to login now!</>}
      </div>
    </div>
  );
}
