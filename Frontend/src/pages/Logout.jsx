import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

export const Logout = () => {

  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  setCurrentUser(null);
  navigate('/')
  return (
    <div></div>
  )
}
