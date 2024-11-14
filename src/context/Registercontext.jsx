import React, { createContext, useContext, useReducer, useState } from 'react'


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
   function login(userinfo){
    if(userinfo.username==state.users.username && userinfo.password==state.users.password ){
      dispatch({type:"login"})
      console.log(state.islogin)
    }

   }
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

