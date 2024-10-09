"use client"
import useFetchUser from "@/hooks/useFetchUser";
import Todos from "./todos/page";

export default function Home() {
  useFetchUser()
  return (
   <>
   <Todos/>
 
   </>
  );
}
