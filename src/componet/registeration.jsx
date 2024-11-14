import { Link } from "react-router-dom";
import { useRegister } from "../context/Registercontext";
import { useState } from "react";

function Registeration() {
  const [formData, setFormData] = useState({
    id:null,
    name:"",
    username: '',
    password: '',
    department:"",
    year:null,
  });
  const {dispatch,state}=useRegister();
// function handleregister(e){
//   e.preventDefault()
//   if(formData.username=="" && formData=="") return;
//   register(formData)

//   setFormData({...formData,username:"",password:""})
// }
const handleuser = (event) => {
  setFormData({ ...formData, username: event.target.value });

};
const handlePawd = (event) => {
  event.preventDefault()
  setFormData({ ...formData, password: event.target.value });
};
const handlename = (event) => {
  event.preventDefault()
  setFormData({ ...formData, name: event.target.value });
};
const handleid = (event) => {
  event.preventDefault()
  setFormData({ ...formData, id: event.target.value });
};
const handledepartment = (event) => {
  event.preventDefault()
  setFormData({ ...formData, department: event.target.value });
};
const handleyear = (event) => {
  event.preventDefault()
  setFormData({ ...formData, year: event.target.value });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  dispatch({ type: 'register-request' });

  try {
    // Replace this with your actual registration logic 
    // (e.g., using a backend API)
    const response = await fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    dispatch({ type: 'register-success', payload: data });
    setFormData({...formData,id:null,username:"",password:"",name:"",department:"",year:null}) 
  } catch (error) {
    dispatch({ type: 'register-error', payload: error.message });
  }
};
console.log(state.error)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">id no</label>
        <input type="number" value={formData.id} onChange={handleid}/> <br />
      <label htmlFor="name">name</label>
      <input type="text" value={formData.name} onChange={handlename}/><br />

      <label htmlFor="department">department</label>
      <input type="text" value={formData.department} onChange={handledepartment} />  <br />
      <label htmlFor="username">username</label>
  
      <input type="text" value={formData.username} onChange={ handleuser} />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" value={formData.password} onChange={handlePawd} />
      <br />
      <label htmlFor="year">Year</label>
      <input type="number" value={formData.year} onChange={handleyear} />
      <br />
      <button>Register</button>
      </form>
         <ul>
           {state.users.map((user, index) => (
             <li key={index}>
               Username: {user.username}, password: {user.password}
             </li>
           ))}
         </ul>
         <div>
          {state.error}
         </div>

      <div>
      <div>if you have an account </div>
        <button><Link to="/login" >login </Link></button>
      </div>
    </div>
  );
}

export default Registeration;
