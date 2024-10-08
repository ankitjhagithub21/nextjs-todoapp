"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const AddTodo = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleAddTodo = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const todo = Object.fromEntries(formData.entries())
        setIsLoading(true)
        
        try {
            const res = await fetch("/api/todos/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials:'include',
                body: JSON.stringify(todo)
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
        <div className="max-w-xl mx-auto my-24 px-5">
            <h2 className="mb-5 text-center text-2xl font-semibold">
                Add New Todo
            </h2>
            <form className="flex flex-col gap-3" onSubmit={handleAddTodo}>
                <input type="text" placeholder="Enter title" name="title" className="input input-primary " required />
                <textarea name="description" placeholder="Enter description" rows={5} className="textarea textarea-primary resize-none"  required></textarea>
                <button className="btn btn-primary" disabled={isLoading}>
                    Add
                </button>
            </form>

        </div>
    )
}

export default AddTodo
