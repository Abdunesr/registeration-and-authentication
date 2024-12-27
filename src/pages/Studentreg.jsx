import { useRegister } from "../context/Registercontext";
import { useEffect, useState } from "react";
import Loading from "../componet/Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
export default function Studentreg() {
  const [successMessage, setSuceesmessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    department: "",
    year: "",
    courses: [{ coursecode: null, coursename: "", coursescore: 0 }],
  });

  const navigate = useNavigate();
  const { dispatch, state } = useRegister();
  const { isloading, iserror, error } = state;

  useEffect(() => {
    if (iserror) {
      navigate("/dashbord/error");
    }
  }, [iserror]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "register-request" });
    try {
      const response = await fetch("http://localhost:8000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData, null, 2),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      if (response.ok) {
        setSuceesmessage("Student registered successfully!");
        setTimeout(() => {
          setSuceesmessage("");
        }, 3000);
        dispatch({ type: "register-success" });
      }

      setFormData({
        ...formData,
        id: "",
        username: "",
        password: "",
        name: "",
        department: "",
        year: "",
        courses: [{}],
      });
    } catch (error) {
      dispatch({ type: "register-error", payload: error.message });
    }
  };

  const handleinput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlecourseadd = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const newCourses = Array.isArray(prevFormData.courses)
        ? [...prevFormData.courses]
        : [];
      newCourses[index][name] = value;
      return { ...prevFormData, courses: newCourses };
    });
  };

  const addCourse = () => {
    setFormData((prevFormData) => {
      const newCourses = Array.isArray(prevFormData.courses)
        ? prevFormData.courses
        : [];
      return {
        ...prevFormData,
        courses: [
          ...newCourses,
          { coursecode: null, coursename: "", coursescore: null },
        ],
      };
    });
  };

  return (
    <>
      {iserror ? (
        <Error error={error} />
      ) : isloading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="fixed top-20 right-20">
              {successMessage && (
                <Alert variant="filled" severity="success">
                  {successMessage}
                </Alert>
              )}
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="font-bold text-xl">Student Registration form</div>
              <div className="mt-10 grid grid-cols-1  gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student identifcation card
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        dbu-
                      </span>
                      <input
                        required
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleinput}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student department
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student username
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student password
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Student Year
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      type="number"
                      max="5"
                      min="1"
                      name="year"
                      value={formData.year}
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                {Array.isArray(formData.courses) &&
                  formData.courses.map((course, index) => (
                    <span key={index}>
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Course code
                        </label>
                        <div className="mt-2">
                          <input
                            required
                            type="number"
                            name="coursecode"
                            value={course.coursecode || ""}
                            onChange={(event) => handlecourseadd(index, event)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Course name
                        </label>
                        <div className="mt-2">
                          <input
                            required
                            type="text"
                            name="coursename"
                            value={course.coursename || ""}
                            onChange={(event) => handlecourseadd(index, event)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          Course score
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="coursescore"
                            value={course.coursescore || ""}
                            onChange={(event) => handlecourseadd(index, event)}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </span>
                  ))}
                <button
                  type="button"
                  onClick={addCourse}
                  className="rounded-md sm:mt-40 w-max h-max bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  add course
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              disabled={isloading}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
}
