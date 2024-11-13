import React, { createContext, useContext } from 'react'
const Auth=createContext()


 function Authcontext({children}) {


  return (
    <Auth.Provider value={{

    }}>
      {children}
    </Auth.Provider>
  )
}

function useAuth(){
    const context=useContext(Auth)
    if(context==undefined)
        throw new Error("Authprovider is used out of context")
    return context;
}
export {Authcontext,useAuth}