import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const[userData, setUserData] = useState({
    email: '',
    password:''
  })
  const InputOnChange = (property, value)=>{
    setUserData(preObj=>({
        ...preObj, 
        [property] : value
    }))
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form action="#" className="form login__form">
            <p className="form__error-message"> This is an Error message.</p>

            <input onChange={(e)=>{InputOnChange("email", e.target.value)}} value={userData.email} type="text" placeholder={"Email"} autoFocus/>
            <input onChange={(e)=>{InputOnChange("password", e.target.value)}} value={userData.password} type="password" placeholder={"password"}/>
  
            <button  type='submit' className="btn primary">Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login