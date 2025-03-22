import React from 'react';
// A function from react-router-dom that helps define routes in your application using the browser’s history API.
// It maps URLs to specific components.
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Browse from './Browse';

const Body = () => { 
  <div className='overflow-x-hidden no-scrollbar'></div>
  const appRouter = createBrowserRouter([
    {
      //route to login page by creating objects.
    path: "/",
    element: <Login/>,
    errorElement: <div>Not Found</div>
  },
  {
     //route to browse page by creating objects.
    path: "/browse",
    element:<Browse/>
  }
])
//This function returns the JSX (HTML-like syntax in React) that defines what will be rendered on the screen.
  return (
    <div>
      //RouterProvider is responsible for rendering the appropriate component based on the current URL.
      <RouterProvider router = {appRouter} />
    </div>
  )
}

export default Body
