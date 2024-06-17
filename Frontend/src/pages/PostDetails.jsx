import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import PostAuthor from '../components/PostAuthor';
import { UserContext } from '../context/user.Context';
import DeletePost from './DeletePost';

export const PostDetails = () => {

  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading]= useState(false);


  const {currentUser} = useContext(UserContext);

  useEffect(()=>{
    const getPost = async () =>{
      setIsLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err);
      } 
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false after data is loaded
      }, 300);
      // setIsLoading(false);
    }
    getPost();
  }, [])

  if(isLoading){
    return <Loader/>
  }
  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorUserID={post.creator._id} author={post.creator.name} authorImg={post.creator.avatar} createdAt={post.createdAt}/>

            {currentUser?.tokenObject?.id == post?.creator._id && 
            <div className="post-detail_buttons">
              <Link to={`/post/${post._id}/edit`} className='btn sm primary'>Edit</Link>
              <DeletePost postId={id}/>
            </div> }
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
              <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
         
      </div>}
    </section>
  )
}

