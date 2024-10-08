"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const Auth = () => {

  const [currentState, setCurrentState] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    const url = currentState === "login" ? '/api/users/login' : 'api/users/signup'
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    setIsLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })

      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        router.push("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {

      setIsLoading(false)
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
        <input type="text" placeholder="Enter your email" name="email" className="input input-primary " required />
        <input type="password" placeholder="Enter your password" name="password" className="input input-primary " required />
        <button className="btn btn-primary  " disabled={isLoading}>
          {
            currentState === "login" ? 'Login' : 'Register'
          }
        </button>
      </form>
      <p className="mt-5">
        {
          currentState === "login" ? <>
            Don't have an account ? <span className="underline text-primary cursor-pointer" onClick={() => setCurrentState("register")}>Register</span>
          </> : <>
            Already have an account ? <span className="underline text-primary cursor-pointer" onClick={() => setCurrentState("login")}>Login</span>
          </>
        }

      </p>
    </div>
  )
}

export default Auth
