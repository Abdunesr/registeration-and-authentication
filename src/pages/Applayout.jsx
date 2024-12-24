import { Outlet } from "react-router-dom";
import Navbar from "../componet/Navbar";
import { useRegister } from "../context/Registercontext";
import Error from "./Error";

export default function Example() {
  const { state } = useRegister();
  return (
    <>
      <Navbar />
      {state.iserror ? (
        <Error error={state.error} />
      ) : (
        <>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Admin Dashbord{" "}
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </>
      )}
    </>
  );
}
