import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserContext } from '../context/user.Context';


export const DeletePost = ({postId: id}) => {

  const location = useLocation();
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  if(isLoading){
    return <Loader/>
  }

  const removePost = async () =>{
    setIsLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/post/delete-post/${id}`, {
        withCredentials: true, 
        headers: { authorization: `${currentUser?.jwtToken}`
      }});

      if(response.status == 200){
        if(location.pathname == `/dashboard/my-posts}`){
          navigate(0);
        }else{
          navigate('/');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePost;