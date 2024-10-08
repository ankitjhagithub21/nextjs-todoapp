
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/app/slices/userSlice"
import todoReducer from "@/app/slices/todoSlice"

export const store = configureStore({
  reducer: {
    user:userReducer,
    todos:todoReducer
  },
})