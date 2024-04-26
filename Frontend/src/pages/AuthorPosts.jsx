import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { PostItem } from '../components/PostItem';

export const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams();

  useEffect (()=>{
      const fetchPosts = async()=>{
          setIsLoading(true);

          try {
              const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/user-posts/${id}`);
              setPosts(response?.data);
          } catch (err) {
              console.log(err);
          }

          setIsLoading(false);
      }
      fetchPosts();
  }, [id])
  
  if(isLoading){
      return <Loader/>
  }
  return (
      <section className="posts">
        {posts.length > 0 ? <div className="container posts__container">
            {posts.map(({ _id : id, thumbnail, category, title, description, creator, createdAt }) => (
                <div key={id} className="post">
                    <PostItem postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt}/>
                </div>
            )) }
        </div> : <h2 className='center'>No posts founds</h2>}
      </section>
  );
}
