import React, { useContext, useEffect, useState } from 'react';
import { FaCheck, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../assets/avatar1.jpg';
import { UserContext } from '../context/user.context';

export const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  let [userData, setUserData] =  useState({
    name : 'T1',
    email : 't@gmail.com',
    currentPassword : '',
    newPassword : '',
    confirmNewPassword : ''
  })

  const navigate = useNavigate(); 
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);


    const inputOnChange = (property, value) =>{
      setUserData(preObj => ({
        ...preObj, 
        [property] : value
      }))
    }
  return (
    <section className="profile">
        <div className="container profile__container">
          <Link to={`/dashboard/my-posts`} className='btn'>My Posts</Link>


            <div className="avatar__wrapper">
              <div className="profile__avatar">
                <img src={Avatar} alt="" />
              </div>
              {/* form to update avatar */}
              <form className="avatar__form">
                <input type="file" name="avatar" id="avatar" onChange={e =>  (e.target.files[0])} accept="png, jpg, jpeg"/>
                <label htmlFor="avatar"><FaEdit/></label>
              </form>
              <button className="profile__avatar-btn"><FaCheck/></button>
            </div>

            <h1>Anik Dash Akash</h1>
            {/* form to update user info */}
            <form  className="form profile__from">
                <p className="form__error-message">This is an error message</p>
                <input type="text" placeholder="Full name" onChange={e=>{inputOnChange("name", e.target.value)}} value = {userData.name} />
                <input type="text" placeholder="Email"     onChange={e=>{inputOnChange("email", e.target.value)}} value = {userData.email} />
                <input type="text" placeholder="Current password" onChange={e=>{inputOnChange("currentPassword", e.target.value)}} value = {userData.currentPassword} />
                <input type="text" placeholder="New password"     onChange={e=>{inputOnChange("newPassword", e.target.value)}} value = {userData.newPassword} />
                <input type="text" placeholder="Confirm new password"     onChange={e=>{inputOnChange("newPassword", e.target.value)}} value = {userData.newPassword} />
                <button type="submit" className="btn primary">Update details</button>
            </form>
        </div>
    </section>
  )
}
