import React from 'react'
import { Link } from 'react-router-dom'
export default function Error({error}) {
  return (
    <div className='h-[90dvh] flex justify-center items-center'>
         <div className=''>
          <div className='w-full mb-8'>
          <h1 className='text-sm sm:text-3xl font-bold text-red-500 mb-8 '>{error} </h1>
          <h2>error code </h2>
          </div>
          <Link to="/dashbord">
           <button type="outlined" color="error"  >Back</button>
           </Link>
         </div>
    </div>
  )
}
