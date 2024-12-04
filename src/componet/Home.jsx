import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../context/Registercontext";

function Home() {
  const navigate=useNavigate()
  const {state,dispatch}=useRegister()

  const {username,password,name,id,department,courses}=state.user[0]
//add
  function handlelogout(){
    dispatch({type:"logout"})
    if(state.islogin){
     return  navigate("/")
      }
  }


  return <div>

<h1>THIS IS hOME</h1>

<h2>Username:{username}</h2>
<h2>password:{password}</h2>
<h2>name:{name}</h2>
<h2>id:{id}</h2>
<h2>department:{department}</h2>
<div>
 {courses.map(
    (course)=><li key={course.coursecode}>
       <div> {course.coursecode}</div>
       <div> {course.coursename}</div>
       <div> {course.coursescore}</div>
    </li>
 ) }
</div>
                <button onClick={handlelogout}>logout
                </button>
  </div>;
}

export default Home;
