"use client";

import { useDispatch, useSelector } from "react-redux";
import useFetchTodos from "@/hooks/useFetchTodos";
import Todo from "@/app/components/Todo";
import Loader from "@/app/components/Loader";
import toast from "react-hot-toast";
import { removeTodo } from "../slices/todoSlice";

const Todos = () => {
 
  const { loading, error } = useFetchTodos(); 
  const {todos} = useSelector((state) => state.todos); 
  const dispatch = useDispatch()

  const handleDeleteTodo = async(todoId) => {
    try{
      const res = await fetch(`/api/todos/${todoId}`,{
        method:"DELETE"
      })
      const data = await res.json()
      if(data.success){
        dispatch(removeTodo(todoId))
        toast.success(data.message)

      }
    }catch(error){  
        console.log(error)
        toast.error("error.message")
    }
  }

  if (!todos || loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="my-24">
      <h2 className="text-center text-3xl mb-10 font-semibold">Your todos</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {todos?.length > 0 ? (
        todos?.map((todo) => {
          return <Todo key={todo._id} todo={todo} onDelete={handleDeleteTodo}/>;
        })
      ) : (
        <p>No todos available</p>
      )}
    </div>
    </section>
  );
};

export default Todos;
