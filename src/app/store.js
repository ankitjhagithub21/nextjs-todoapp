
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "@/app/slices/userSlice"
export const store = configureStore({
  reducer: {
    user:userReducer
  },
})