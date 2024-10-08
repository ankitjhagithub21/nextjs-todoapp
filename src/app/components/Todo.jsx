import React from 'react'

const Todo = ({ todo }) => {
    return (
        <div className="border rounded-lg p-3">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <b>{todo.createdAt.slice(0, 10)}</b>

        </div>
    )
}

export default Todo
