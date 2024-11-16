import React, { useState } from 'react';
import Alert from '@mui/joy/Alert';

import { useRegister } from '../context/Registercontext';
import { useNavigate } from 'react-router-dom';

export  function Login() {
    const {administrator,dispatch,state}=useRegister();
    // const {islogin}=state
    const {username,password}=administrator;
    const [admin_info,setAdmin_info]=useState({
        admin_username:"",
        admin_password:""
    })
    const naviagate=useNavigate()

    function handleinput(event){
      event.preventDefault()
      const {name,value}=event.target;
      setAdmin_info({...admin_info,
        [name]:value
      })
      
    }
   const auth=username===admin_info.admin_username && password===admin_info.admin_password
    function handlesubmit(event){
      event.preventDefault()
     
      if(auth){
        dispatch({type:"correct-data"})
        return naviagate("/dashbord")
      }
      else{
        dispatch({type:"incorect-data"})
      }
    }
    return (
      <>
        <div className="flex min-h-full  flex-1 flex-col justify-center px-6  py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Log in to dashbord
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form  className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  username
                </label>
                <div className="mt-2">
                  <input
                    name="admin_username"
                    type="text"
                    required
                    value={admin_info.admin_username}
                    onChange={(event)=>handleinput(event)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                   
                    name="admin_password"
                    type='password'
                    value={admin_info.admin_password}
                    onChange={(event)=>handleinput(event)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
           {state?.islogin ? <p className="mt-10 text-center absolute w-[20%] top-0 right-3  text-gray-500">
            <Alert variant={"solid"} size='md'  color="danger">
             incorect username or password
            </Alert>
            </p> :<></>}
          </div>
         
        </div>
      </>
    )
  }
  