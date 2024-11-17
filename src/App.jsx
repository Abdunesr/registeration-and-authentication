import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Login as Dashbordlogin} from './pages/Login'
import { Registercontext } from "./context/Registercontext";
import Applayout from "./pages/Applayout";
import Studentreg from "./pages/Studentreg";
import Error from "./pages/Error";
import Questioninput from "./pages/Questioninput";
import StudentResult from "./pages/StudentResult";

const router=createBrowserRouter([
       
       { 
        path:"/",
        element:<Dashbordlogin />,
      },
        { 
        path:"/dashbord",
        element:<Applayout />,
        children:[
               {
               path:"/dashbord",
                element:<Studentreg />,
    
               },
               {
                path:"/dashbord/question-input-form",
                element:<Questioninput />,
                },
                {path:"/dashbord/error",
                  element:<Error />
                },
                {
                  path:"/dashbord/results",
                  element:<StudentResult />
                }
              ]
          
        }
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
