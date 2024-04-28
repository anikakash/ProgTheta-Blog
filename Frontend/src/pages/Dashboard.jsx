import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserContext } from '../context/user.context';
import DeletePost from './DeletePost';

export const Dashboard = () => {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;
  const id = currentUser?.tokenObject?.id;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  },[]);


  useEffect (()=>{
        const getPosts = async() =>{
          setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/users/my-posts`,{
                  withCredentials: true,
                  headers: { authorization: `${currentUser?.jwtToken}`}
                })
                setPosts(response.data);
            } catch (error) {
              console.log("No post to show");
            }
            setIsLoading(false);
        }
        getPosts();
  }, [])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard__container">
            {
              posts.map(post => {
                return <article key={post.id} className = 'dashboard__post'>
                  <div className="dashboard__post-info">
                      <div className="dashboard__post-thumbnail">
                          <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                      </div>
                      <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to ={`/post/${post._id}`} className='btn sm'>View</Link>
                    <Link to ={`/post/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                    <DeletePost postId={post._id}/>
                    
                  </div>
                </article>
              })
            }
        </div> : <h2 className="center"> You have no posts yet.</h2>
      }
    </section>
  )
}
