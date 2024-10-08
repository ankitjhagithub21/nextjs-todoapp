import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload; 
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload); 
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
