import { Cross1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import toast from 'react-hot-toast'

const EditTodoModal = ({ todo, onClose, onUpdate }) => {
    const [isLoading,setIsLoading] = useState(false)
    const [title,setTitle] = useState(todo.title)
    const [description,setDescription] = useState(todo.description)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        try{

            const res = await fetch(`/api/todos/${todo._id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({title,description})
            })

            const data = await res.json()
            if(data.success){
                toast.success(data.message)
                onUpdate(data.todo)
              
               
            }else{
                toast.error(data.message)
                
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="h-screen w-full fixed top-0 left-0 flex flex-col p-5 items-center justify-center backdrop-blur-lg">
            <h2 className="text-2xl mb-5 font-semibold">Edit todo</h2>
            <form className="flex flex-col gap-3 w-full max-w-lg"onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="input input-primary " required />
                <textarea name="description" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} rows={5} className="textarea textarea-primary resize-none" required></textarea>
                <button className="btn btn-primary" disabled={isLoading}>
                    Save changes
                </button>
            </form>

            <button className="absolute top-5 right-5" onClick={onClose}>
                <Cross1Icon size={25}/>
            </button>
        </div>
    )
}

export default EditTodoModal
