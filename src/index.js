import React from "react"
import App from "./App"
import { AuthProvider } from "./navigation/AuthProvider"
const Provider =()=>{
    return(
      <AuthProvider>
       <App/>
      </AuthProvider>
    )
}

export default Provider