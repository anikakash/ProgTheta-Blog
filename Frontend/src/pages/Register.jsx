import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const Register = () => {
  const[userData, setUserData] = useState({
    name: '',
    email: '',
    password:'',
    password2:''
  })

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const InputOnChange = (property, value)=>{
    setUserData(preObj=>({
        ...preObj, 
        [property] : value
    }))
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {

      const reponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, userData);
      const newUser = await reponse.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again.");
      }
      navigate('/login');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  




  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser} className="form register__form">
            {error && <p className="form__error-message">{error}</p>}

            <input onChange={(e)=>{InputOnChange("name", e.target.value)}} value={userData.name} type="text" placeholder={"Full Name"}/>
            
            <input onChange={(e)=>{InputOnChange("email", e.target.value)}} value={userData.email} type="text" placeholder={"Email"}/>
            <input onChange={(e)=>{InputOnChange("password", e.target.value)}} value={userData.password} type="password" placeholder={"password"}/>
            <input onChange={(e)=>{InputOnChange("password2", e.target.value)}} value={userData.password2} type="password" placeholder={"confirmPassword"}/>
            <button  type='submit' className="btn primary">Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register