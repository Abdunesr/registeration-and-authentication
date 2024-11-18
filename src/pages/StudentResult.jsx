import { useEffect, useState } from "react"
  
  export default function StudentResult() {
    const [students,setStudents]=useState([])

    useEffect(()=>{
    async function fetchcoursedata() {
      const res=await fetch("http://localhost:8000/students")
      const data=await res.json()
      setStudents(data)
    }
    fetchcoursedata()
    },[setStudents])

    students.forEach(student => { if (student.id && student.name) { 
      console.log(`Student ID: ${student.id}`); 
      console.log(`Student Name: ${student.name}`); 
      if (Array.isArray(student.courses)) 
      { student.courses.forEach(course => { console.log(`Course Name: ${course.coursename}`); console.log(`Course Score: ${course.coursescore}`); }); } } });

    return (
      <ul role="list" className="divide-y divide-gray-100">
        {students.map((student,studentindex) => (
          <li key={studentindex} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{student.name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">{student.id}</p>
              </div>
            </div>
       
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">

            {student.courses.map((course, courseIndex) => 
              ( <div key={courseIndex} className="w-44" > 
              <div className="flex justify-around text-center "> <span className="font-semibold">Course Name: </span>
                <span>{course.coursename} </span>
              </div> 
              <div className="flex justify-around items-center text-center">
                <span className="font-semibold">Course Score:</span>
                <span>{course.coursescore}</span> </div> </div> ))}
            </div>
          </li>
        ))}
      </ul>
    )
  }
  