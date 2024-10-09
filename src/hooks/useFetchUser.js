import { setIsLoggedIn, setUser } from '@/app/slices/userSlice';
import { useEffect} from 'react'
import { useDispatch } from 'react-redux';

const useFetchUser = () => {
   
    const dispatch = useDispatch();
     
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/todos", {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setUser(data.user))
                    dispatch(setIsLoggedIn(true))
                }
            } catch (error) {
                dispatch(setIsLoggedIn(false))
                dispatch(setUser(null))
            } 
        }
      fetchUser()
    }, [])
  
}


export default useFetchUser
