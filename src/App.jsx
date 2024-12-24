import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login as Dashbordlogin } from "./pages/Login";
import { Registercontext } from "./context/Registercontext";
import Applayout from "./pages/Applayout";
import Studentreg from "./pages/Studentreg";
import Error from "./pages/Error";
import Questioninput from "./pages/Questioninput";
import StudentResult from "./pages/StudentResult";
import ProtectedRoute from "./context/Protectedroute";
import { AuthProvider } from "./context/Authprovider";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Dashbordlogin />,
      errorElement: <Error />,
    },
    {
      path: "/dashbord",
      errorElement: <Error />,
      element: (
        <ProtectedRoute>
          <Applayout />
        </ProtectedRoute>
      ),

      children: [
        {
          path: "/dashbord",
          element: <Studentreg />,
          errorElement: <Error />,
        },
        {
          path: "/dashbord/question-input-form",
          element: <Questioninput />,
          errorElement: <Error />,
        },
        {
          path: "/dashbord/results",
          element: <StudentResult />,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
function App() {
  return (
    <Registercontext>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Registercontext>
  );
}

export default App;
