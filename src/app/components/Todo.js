import React from 'react'

const Todo = ({ todo ,onDelete,onEdit}) => {
    
    return (
        <div className="border rounded-lg p-3" >
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <b>{todo.createdAt.slice(0, 10)}</b>
           <div className="mt-3">
           <button className="btn btn-warning btn-sm" onClick={()=>onDelete(todo._id)}>Remove</button>
           <button className="btn  btn-primary ml-2 btn-sm" onClick={()=>onEdit(todo)}>Edit</button>
           </div>
        </div>
    )
}

export default Todo
