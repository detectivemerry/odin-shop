import React from 'react'

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <div className = "text-center text-2xl m-3 underline decoration-orange-800">Create an Account</div>
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
        onClick={() => signIn('credentials', {email, password, callbackUrl : "localhost:3000/Login"})}>Register</button>

      </div>
    </div>
  )
}
