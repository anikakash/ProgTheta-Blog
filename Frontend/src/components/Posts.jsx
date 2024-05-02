import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import PostItem from './PostItem';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect (()=>{
        const fetchPosts = async()=>{
            setIsLoading(true);

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/all`);
                console.log('Response from API: ', response);
                setPosts(response?.data);
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        }
        fetchPosts();
    }, [])
    
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
};

export default Posts;
