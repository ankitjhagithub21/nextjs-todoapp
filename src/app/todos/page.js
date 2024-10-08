"use client"

import { useEffect, useState } from 'react'

const Todos = () => {
    const [todos,setTodos] = useState([])

    useEffect(()=>{
      const fetchTodos = async() => {
          const res = await fetch("/api/todos",{
            credentials:'include'
          })
          const data = await res.json()
          if(data.success){
            setTodos(data.todos)
          }
      }
      fetchTodos()
    },[])

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 my-24">
      {
        todos.map((todo)=>{
          return <div key={todo._id} className="border rounded-lg p-3">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <b>{todo.createdAt.slice(0,10)}</b>
            
          </div>
        })
      }
    </div>
  )
}

export default Todos
