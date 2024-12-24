import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../componet/Navbar";
export default function Error({ error }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="h-[90dvh] flex justify-center items-center">
        <div className="">
          <div className="w-full mb-8">
            <h1 className="text-sm sm:text-3xl font-bold text-red-500 mb-8 ">
              {error}{" "}
            </h1>
            <h2>error code </h2>
          </div>
          <Link onClick={() => navigate(-1)}>
            <button type="outlined" color="error">
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
