import { useEffect, useState } from "react";
import { useRegister } from "../context/Registercontext";
import Loading from "../componet/Loading";

export default function StudentResult() {
  const [students, setStudents] = useState([]);
  const { dispatch, state } = useRegister();
  const { error, iserror, isloading } = state;
  useEffect(() => {
    async function fetchcoursedata() {
      try {
        dispatch({ type: "register-request" });
        const res = await fetch("http://localhost:8000/students");
        if (!res.ok) {
          throw new Error("can't recive data from api");
        }
        const data = await res.json();
        dispatch({ type: "register-success" });
        setStudents(data);
      } catch (error) {
        dispatch({ type: "register-error", payload: error.message });
      }
    }
    fetchcoursedata();
  }, [setStudents]);

  students.forEach((student) => {
    if (student.id && student.name) {
      console.log(`Student ID: ${student.id}`);
      console.log(`Student Name: ${student.name}`);
      if (Array.isArray(student.courses)) {
        student.courses.forEach((course) => {
          console.log(`Course Name: ${course.coursename}`);
          console.log(`Course Score: ${course.coursescore}`);
        });
      }
    }
  });

  return (
    <>
      {iserror ? (
        <Error error={error} />
      ) : isloading ? (
        <Loading />
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {students.map((student, studentindex) => (
            <li
              key={studentindex}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">
                    {student.name}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {student.id}
                  </p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">
                    {student.department}
                  </p>
                </div>
              </div>

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                {student.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="w-44">
                    <div className="flex justify-around text-center ">
                      {" "}
                      <span className="font-semibold">Course Name: </span>
                      <span>{course.coursename} </span>
                    </div>
                    <div className="flex justify-around items-center text-center">
                      <span className="font-semibold">Course Score:</span>
                      <span>{course.coursescore}</span>{" "}
                    </div>{" "}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
