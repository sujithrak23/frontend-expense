import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'

export default function Login() {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()
    const[cookies,setCookies] = useCookies([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
           const loginResponse = await fetch("http://localhost:5000/user/login",{
             method: "POST",
             headers: {
                "Content-Type" : "application/json",
             },
             body: JSON.stringify({
                emailID: email,
                password,
             }),
           });

           const loginData = await loginResponse.json()
           if(loginData.status === "failure"){
            alert(loginData.message)
           }
           else{
             console.log(loginData)
             setCookies('token', loginData.accessToken, { maxAge: 60 * 60 * 60 })
             setCookies('userID', loginData.UserDetails.userID, { maxAge: 60 * 60 * 60 })
             navigate("/expense")
           }
        }
        catch(error){
           console.log('API error',error)
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Email</label>
        <input 
            type="email" 
            id='email'
            value={email} 
            onChange={handleEmailChange}
            required
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Password</label>
        <input 
            type="password" 
            id='password'
            value={password} 
            onChange={handlePasswordChange}
            required
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}
