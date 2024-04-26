import React from 'react'
import { useCookies } from 'react-cookie';


export default function Logout() {

    const [cookies,setCookies,removeCookies] = useCookies();
    
const handleLogout = () => {
    removeCookies("userID");
    removeCookies("token")
}

  return (
    <button onClick={handleLogout} 
      style={{
        padding: "10px",
        margin: "5px",
        backgroundColor: "red",
        color: "white",
        borderRadius: "5px"
      }}
    >
     Logout
    </button>
  )
}
