"use client"

import { useEffect, useState } from 'react'
import Todo from '@/app/components/Todo'
import Loader from '@/app/components/Loader'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/todos", {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setTodos(data.todos)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  if(loading){
    return <Loader/>
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 my-24">
      {
        todos.map((todo) => {
          return <Todo key={todo._id} todo={todo} />
        })
      }
    </div>
  )
}

export default Todos
