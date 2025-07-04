import React from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Login from './Login';
import Browse from './Browse';
import { setUser } from '../redux/userSlice';

const Body = () => { 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // Restore user from localStorage on app load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
    setLoading(false);
  }, [dispatch]);
  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-white text-2xl">Loading...</div>

  const appRouter = createBrowserRouter([
    {
    path: "/",
    element: <Login/>,
    errorElement: <div>Not Found</div>
  },
  {
    path: "/browse",
    element:<Browse/>
  },
  {
    path: "/search",
    element: React.createElement(require('./SearchResults').default)
  }
])
  return (
    <div>
      <RouterProvider router = {appRouter} />
    </div>
  )
}

export default Body
