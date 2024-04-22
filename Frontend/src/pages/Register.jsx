import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Register = () => {
  const[userData, setUserData] = useState({
    name: '',
    email: '',
    password:'',
    confirmPassword:''
  })
  const InputOnChange = (property, value)=>{
    setUserData(preObj=>({
        ...preObj, 
        [property] : value
    }))
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="#" className="form register__form">
            <p className="form__error-message"> This is an Error message.</p>

            <input onChange={(e)=>{InputOnChange("name", e.target.value)}} value={userData.name} type="text" placeholder={"Full Name"}/>
            <input onChange={(e)=>{InputOnChange("email", e.target.value)}} value={userData.email} type="text" placeholder={"Email"}/>
            <input onChange={(e)=>{InputOnChange("password", e.target.value)}} value={userData.password} type="password" placeholder={"password"}/>
            <input onChange={(e)=>{InputOnChange("confirmPassword", e.target.value)}} value={userData.confirmPassword} type="password" placeholder={"confirmPassword"}/>
            <button  type='submit' className="btn primary">Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register