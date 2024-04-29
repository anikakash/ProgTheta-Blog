import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaCheck, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

export const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  let [userData, setUserData] =  useState({
    name : '',
    email : '',
    currentPassword : '',
    newPassword : '',
    confirmNewPassword : ''
  })
  
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
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

    useEffect(()=>{
      const getUserData = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/my-info`,{
              withCredentials: true,
              headers: { authorization: `${currentUser?.jwtToken}`}
            });
            
            // Featching User data: 
            setUserData(prevUserData=>({
              ...prevUserData,
              name: response.data.name,
              email: response.data.email,
            }))

            // Featching user DP:
            const {avatar} = response.data;
            setAvatar(avatar);

        } catch (error) {
          setError(error.response.data.message);
        }
      }
      getUserData();
    },[]);


    // Update Avater:

    const changeAvatarHandler = async() => {
      setIsAvatarTouched(false);
      try {
        const postData = new FormData();
        postData.set('avatar', avatar);
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/change-avatar`, postData, {
          withCredentials: true,
          headers: { authorization: `${currentUser?.jwtToken}` },
        })
        setAvatar(response?.data.avatar)
      } catch (error) {
        console.log(error);
      }
    }

    // Updating user data: 
    const updateInfo = async(e)=>{
      e.preventDefault();
      console.log(userData);
      try {
        const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/users/update-user`, userData, {
          withCredentials: true,
          headers: { authorization: `${currentUser?.jwtToken}` },
        });

        if(response.status === 200){
          return navigate('/logout');
        }
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      }

    }


  return (
    <section className="profile">
        <div className="container profile__container">
          <Link to={`/dashboard/my-posts`} className='btn'>My Posts</Link>


            <div className="profile__details">
              <div className="avatar__wrapper">
                <div className="profile__avatar">
                  {avatar && (<img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${avatar}`} alt="" />)}
                </div>

                    {/* form to update avatar */}
                    <form className="avatar__form">
                      <input type="file" name="avatar" id="avatar" onChange={e =>  setAvatar(e.target.files[0])} accept="png, jpg, jpeg"/>
                      <label htmlFor="avatar" onClick={()=> setIsAvatarTouched(true)}><FaEdit/></label>
                    </form>
                    {isAvatarTouched && <button className="profile__avatar-btn" onClick={changeAvatarHandler}><FaCheck/></button>}
              </div>

              <h1>{currentUser.tokenObject.Name}</h1>

              {/* form to update user info */}
              
              <form onSubmit={updateInfo} className="form profile__from">
              {error && <p className="form__error-message">{error}</p>}
                  <input type="text" placeholder="Full name" onChange={e=>{inputOnChange("name", e.target.value)}} value = {userData.name} />
                  <input type="text" placeholder="Email"     onChange={e=>{inputOnChange("email", e.target.value)}} value = {userData.email} />
                  <input type="text" placeholder="Current password" onChange={e=>{inputOnChange("currentPassword", e.target.value)}} value = {userData.currentPassword} />
                  <input type="text" placeholder="New password"     onChange={e=>{inputOnChange("newPassword", e.target.value)}} value = {userData.newPassword} />
                  <input type="text" placeholder="Confirm new password"     onChange={e=>{inputOnChange("confirmNewPassword", e.target.value)}} value = {userData.confirmNewPassword} />
                  <button type="submit" className="btn primary">Update details</button>
              </form>
            </div>
        </div>
    </section>
  )
}
