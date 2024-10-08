"use client";

import { useSelector } from "react-redux";
import useFetchTodos from "@/hooks/useFetchTodos";
import Todo from "@/app/components/Todo";
import Loader from "@/app/components/Loader";

const Todos = () => {
 
  const { loading, error } = useFetchTodos(); 
  const {todos} = useSelector((state) => state.todos); 

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="my-24">
      <h2 className="text-center text-3xl mb-10 font-semibold">Your todos</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {todos.length > 0 ? (
        todos.map((todo) => {
          return <Todo key={todo._id} todo={todo} />;
        })
      ) : (
        <p>No todos available</p>
      )}
    </div>
    </section>
  );
};

export default Todos;
