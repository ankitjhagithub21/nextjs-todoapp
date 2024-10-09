"use client"
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn, setUser } from '../slices/userSlice'


const Header = () => {
  const pathName = usePathname()
  const {isLoggedIn} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const handleLogout = async() => {
      try{
        const res = await fetch("/api/users/logout")
        const data = await res.json()
        if(data.success){
          toast.success(data.message)
          dispatch(setIsLoggedIn(false))
          dispatch(setUser(null))
        }
      }catch(error){  
        console.log(error)
      }
  }

  return (
    <header className="w-full fixed top-0">
      <nav className="navbar bg-base-100 max-w-7xl mx-auto ">
        <div className="flex-1 gap-2">
          <Link href="/" className={`btn ${pathName === "/" && "btn-primary"} `}>Home</Link>
          <Link href="/add" className={`btn ${pathName === "/add" && "btn-primary"} `}>Add Todo</Link>
        </div>
       {
        isLoggedIn ? <>
         <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              
              <li><a>Settings</a></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        </div>
        </> :   <Link href="/auth" className={`btn ${pathName === "/auth" && "btn-primary"} `}>Login</Link>
       }
      </nav>
    </header>
  )
}

export default Header
