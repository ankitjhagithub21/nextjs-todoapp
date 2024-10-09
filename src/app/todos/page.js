"use client";

import { useDispatch, useSelector } from "react-redux";
import useFetchTodos from "@/hooks/useFetchTodos";
import Todo from "@/app/components/Todo";
import Loader from "@/app/components/Loader";
import toast from "react-hot-toast";
import { removeTodo, setTodos } from "../slices/todoSlice";
import { useState } from "react";
import EditTodoModal from "../components/EditTodoModal";

const Todos = () => {

  const { loading, error } = useFetchTodos();
  const { todos } = useSelector((state) => state.todos);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editedTodo, setEditedTodo] = useState(null)
  const dispatch = useDispatch()

  const handleDeleteTodo = async (todoId) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if (data.success) {
        dispatch(removeTodo(todoId))
        toast.success(data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error("error.message")
    }
  }
  const handleUpdateTodo = async (todo) => {
    setEditedTodo(todo)
    setIsModalOpen(true)
  }
  const onClose = async () => {
    setIsModalOpen(false)
    setEditedTodo(null)

  }

  const onUpdate = (updatedTodo) => {
    setIsModalOpen(false)
    setEditedTodo(null)
    const updatedTodos = todos.map((todo) => todo._id === updatedTodo._id ? (
      {
        ...todo,
        title: updatedTodo.title,
        description: updatedTodo.description
      }
    ) : todo)
    dispatch(setTodos(updatedTodos))

  }

  if (!todos || loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="my-24">
      {
        isModalOpen && editedTodo && <EditTodoModal todo={editedTodo} onClose={onClose} onUpdate={onUpdate} />
      }
      <h2 className="text-center text-3xl mb-10 font-semibold">Your todos</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {todos?.length > 0 ? (
          todos?.map((todo) => {
            return <Todo key={todo._id} todo={todo} onDelete={handleDeleteTodo} onEdit={handleUpdateTodo}  />;
          })
        ) : (
          <p>No todos available</p>
        )}
      </div>
    </section>
  );
};

export default Todos;
