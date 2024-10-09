import { Cross1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'

const EditTodoModal = ({ todo, onClose }) => {
    const [isLoading,setIsLoading] = useState(false)
    return (
        <div className="h-screen w-full fixed top-0 left-0 flex flex-col items-center justify-center backdrop-blur-lg">
            <h2 className="text-2xl mb-5 font-semibold">Edit todo</h2>
            <form className="flex flex-col gap-3 w-full max-w-lg" >
                <input type="text" placeholder="Enter title" name="title" className="input input-primary " required />
                <textarea name="description" placeholder="Enter description" rows={5} className="textarea textarea-primary resize-none" required></textarea>
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
