import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './componet/Home'
import Login from './componet/Login'
import Registeration from './componet/registeration'

const router=createBrowserRouter([
   {
    path:'/',
    element:<Registeration />,},
      {
        path:"/home",
        element:<Home />
      },
      {
        path:"/login",
        element:<Login />
      }

    
])
function App() {
  return (
   <RouterProvider router={router} />
  )
  
  ;
}

export default App;
