import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';


export const DeletePost = ({postId: id}) => {

  const location = useLocation();
  const navigate = useNavigate(); 
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const removePost = async () =>{
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/post/delete-post/${id}`, {
        withCredentials: true, 
        headers: { authorization: `${currentUser?.jwtToken}`
      }});

      if(response.status == 200){
        if(location.pathname == `/myposts/${currentUser?.tokenObject?.id}`){
          navigate(0);
        }else{
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePost;