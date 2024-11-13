import React, { createContext, useContext } from 'react'


const Register=createContext()







 function Registercontext({children}) {

  return (
    <Register.Provider value={{
        
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

