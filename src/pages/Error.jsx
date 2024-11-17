import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Error({error}) {
   const navigate= useNavigate()

   useEffect(()=>{
    if(error==""){
        navigate("/dashbord")
    }
   },[])
  return (
    <div className='h-[90dvh] flex justify-center items-center'>
         <div className=''>
          <div className='w-full mb-8'>
          <h1 className='text-sm sm:text-3xl font-bold text-red-500 mb-8 '>{error} </h1>
          <h2>error code </h2>
          </div>
          
          <Link to="/">
           <button type="outlined" color="error"  >Back</button>
           </Link>
         </div>
    </div>
  )
}
