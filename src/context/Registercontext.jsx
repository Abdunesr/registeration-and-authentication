import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'


const Register=createContext()
const initalstate={
     users:[],
     isloading:false,
     error:false,
     islogin:false,
}

function reducer(state,action){
  switch(action.type){
    case "register-success":
      return {
        ...state,
        users:[...state.users,action.payload]
      }
    case "register-request":
      return {
        ...state,
        isloading:true,
        error:null,
      }
      case "register-error":
        return{
          ...state,
          isloading:false,
          error:error.payload
        }
        case "login":
          return {
            ...state,
            islogin:true
          }

  }
}

 function Registercontext({children}) {
   const [state,dispatch]=useReducer(reducer,initalstate)
   const [apidata,setApidata]=useState([])

   function login(userinfo){
    const checkCredentials = (input) => {
       const { username, password } = input; 
       return apidata.some(student => student.username === username && student.password === password); };
       const credentials = userinfo 
       if (checkCredentials(credentials)) { 
        console.log("Credentials are valid");
        dispatch({type:"login"})
       console.log(state.islogin) 
        } 
       else { 
        console.log("Invalid credentials");
       }
   }

   useEffect(function(){
        async function fetchdata(){
          const res=await fetch("http://localhost:8000/students")
          const data=await res.json()
          setApidata(data)
         }
         fetchdata()
   },[apidata])
  return (
    <Register.Provider value={{
      dispatch,
          state,login
    }}>
      {children}
    </Register.Provider>
  )
}

 function useRegister(){
    const context=useContext(Register)
    if(context==undefined)
        throw new Error("Registercontext is out of provider")
    return context;
}
export {useRegister, Registercontext };

