import { useEffect, useState } from "react";
import { useRegister } from "../context/Registercontext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [logindata,setLogindata]=useState({username:"",password:""})
   const {login,state}  =useRegister();

   const navigate=useNavigate()

   useEffect(()=>{

     if(state.islogin) {
      return navigate("/home")
    }
   },[state.islogin,navigate])
 
  function handlesubmit(e){
     e.preventDefault();
     login(logindata)
  }
  function handleusename(e){
    e.preventDefault()
    setLogindata({...logindata,username:e.target.value})
  }
  function handlepassword(e){
    e.preventDefault()
    setLogindata({...logindata,password:e.target.value})
  }
 
  return (
    <div>
      <form  onSubmit={handlesubmit}>
      <label>username </label>
      <input type="text" value={logindata.username} onChange={handleusename} /> <br />
      <label htmlFor="password">Password</label>
      <input type="password" value={logindata.password} onChange={handlepassword} />
      <br />
      <button>Login</button>
      </form>
      <div>
       { state.islogin ? "login successfuly":"invalid username or password" }
       </div>
    </div>
  );
}

export default Login;
