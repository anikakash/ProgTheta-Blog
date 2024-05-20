import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.Context';

export const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleInputChange = (property, value) => {
    setUserData(prevObj => ({
      ...prevObj,
      [property]: value
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={loginUser} className="form login__form">
        {error && <p className="form__error-message">{error}</p>}
          <input onChange={(e) => handleInputChange("email", e.target.value)} value={userData.email} type="text" placeholder={"Email"} autoFocus />
          <input onChange={(e) => handleInputChange("password", e.target.value)} value={userData.password} type="password" placeholder={"Password"} />
          <button type='submit' className="btn primary">Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up</Link></small>
      </div>
    </section>
  );
};

export default Login;
