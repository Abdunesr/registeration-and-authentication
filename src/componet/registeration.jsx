import { Link } from "react-router-dom";
import { useRegister } from "../context/Registercontext";
import { useEffect, useState } from "react";

function Registeration() {
  const [formData, setFormData] = useState({
    id:null,
    name:"",
    username: '',
    password: '',
    department:"",
    year:null,
    courses: [ { coursecode: null, coursename: "", coursescore: null, } ]
  });
  const {dispatch,state}=useRegister();


useEffect(function (){
  async function fetchdata() {
    try{
      const res=await fetch('http://localhost:8000/students')
      const data=await res.json();
      console.log(data)
      dispatch({ type: 'register-success', payload: data });
    }
    catch(error){
      console.log(error)
    }
    
  }

  fetchdata();
},[setFormData])

const handleSubmit = async (event) => {
  event.preventDefault();
  dispatch({ type: 'register-request' });
  const formdata=[formData]
 console.log(formdata)

  try {
    // Replace this with your actual registration logic 
    // (e.g., using a backend API)
    const response = await fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData,null, 2),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const data = await response.json();
    dispatch({ type: 'register-success', payload: data });
    setFormData({...formData,id:null,username:"",password:"",name:"",department:"",year:null,courses:[]}) 
  } catch (error) {
    dispatch({ type: 'register-error', payload: error.message });
  }
};
const handleinput =(event)=>{
  event.preventDefault();
  const {name,value}=event.target;
  setFormData({...formData,
    [name]:value
  })

}

  const handlecourseadd = (index, event) => { const { name, value } = event.target; setFormData((prevFormData) => { const newCourses = Array.isArray(prevFormData.courses) ? [...prevFormData.courses] : []; newCourses[index][name] = value; return { ...prevFormData, courses: newCourses }; }); };
  const addCourse = () => { 
    setFormData((prevFormData) => { const newCourses = Array.isArray(prevFormData.courses) ? prevFormData.courses : []; return { ...prevFormData, courses: [ ...newCourses, { coursecode: null, coursename: "", coursescore: null } ] }; });};

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>student informtion</h1>
        <label htmlFor="id">id no</label>
        <input type="number" name="id" value={formData.id} onChange={handleinput}/> <br />
      <label htmlFor="name">name</label>
      <input type="text" name="name" value={formData.name} onChange={handleinput}/><br />

      <label htmlFor="department">department</label>
      <input type="text" name="department" value={formData.department} onChange={handleinput} />  <br />
      <label htmlFor="username">username</label>
  
      <input type="text" name="username" value={formData.username} onChange={ handleinput} />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={formData.password} onChange={handleinput} />
      <br />
      <label htmlFor="year">Year</label>
      <input type="number" name="year" value={formData.year} onChange={handleinput} />
      <br />

      <h1>Courses</h1>{ 
      Array.isArray(formData.courses) && formData.courses.map((course,index)=>(
        <div key={index}>
      <label htmlFor="courseid">courseid</label>
      <input type="number" name="coursecode" value={course.coursecode || ""} onChange={(event)=>handlecourseadd(index,event)} /> <br />

      <label htmlFor="courseid">course name</label>
      <input type="text" name="coursename" value={course.coursename || ""} onChange={(event)=>handlecourseadd(index,event)} /> <br />
 
      <label htmlFor="courseid">course score</label>
      <input type="number" name="coursescore" value={course.coursescore || ""} onChange={(event)=>handlecourseadd(index,event)} /> <br />
    
       </div>))}
      <button type="button" onClick={addCourse}>add course</button>
      <button type="submit">register</button>
      </form>


      <div>
      <div>if you have an account </div>
        <button><Link to="/login" >login </Link></button>
      </div>
    </div>
  );
}

export default Registeration;
