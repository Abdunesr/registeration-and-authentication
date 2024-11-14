import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './componet/Home'
import Login from './componet/Login'
import Registeration from './componet/registeration'
import { Authcontext } from "./context/Authcontext";
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
      }

    
])
function App() {
  return (
    <Registercontext>
       <Authcontext> 
         <RouterProvider router={router} />
       </Authcontext>
    </Registercontext>
  )
  
  ;
}

export default App;
