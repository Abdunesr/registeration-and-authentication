import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './componet/Home'
import Login from './componet/Login'
import Registeration from './componet/registeration'
import { Registercontext } from "./context/Registercontext";

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
      },
      

    
],{
  future: {
    v7_relativeSplatPath: true,
  },
})
function App() {
  return (
    <Registercontext>
         <RouterProvider router={router} />
    </Registercontext>
  )
  
  ;
}

export default App;
