"use client"
import { useState } from "react"

const Auth = () => {
    
  const [currentState,setCurrentState] = useState("login")

  const handleLogin = async(e) => {
    e.preventDefault()
    const url = currentState==="login" ? '/api/users/login' :'api/users/signup'
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    try{
      const res = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
      })

      const data = await res.json()
      console.log(data)
    } catch(error) {
      console.log(error)
    }  
  }

  return (
    <div className="max-w-md mx-auto my-24 px-5">
      <h2 className="mb-5 text-center text-2xl font-semibold">
        {
          currentState === "login" ? 'Login to your account' : 'Create an account'
        }
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <input type="text" placeholder="Enter your email" name="email" className="input input-primary rounded-full" required />
        <input type="password" placeholder="Enter your password" name="password" className="input input-primary rounded-full" required/>
        <button className="btn btn-primary  rounded-full">
        {
          currentState === "login" ? 'Login' : 'Register'
        }
        </button>
      </form>
    </div>
  )
}

export default Auth
