import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Body = ({ children }) => { 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated via cookies on app load
  useEffect(() => {
    setLoading(false);
  }, [dispatch]);
  
  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-white text-2xl">Loading...</div>

  return (
    <div>
      {children}
    </div>
  );
}

export default Body;
