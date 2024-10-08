import { setTodos } from '@/app/slices/todoSlice';
import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';

const useFetchTodos = () => {
    const {todos} = useSelector((state) => state.todos); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

   

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/todos", {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setTodos(data.todos))
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        if(!todos){
            fetchTodos()
        }
    }, [])
    return { loading, error };
}


export default useFetchTodos
