import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { PostItem } from '../components/PostItem';

export const CatagoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/categories/${category}`);
        setPosts(response?.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.response.data.message );
        setPosts([]); // Clear the posts state
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
            {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
                <div key={id} className="post">
                    <PostItem 
                        postID={id} 
                        thumbnail={thumbnail} 
                        category={category?.title || 'Unknown'} // Handle undefined category
                        categoryId={category._id}
                        title={title} 
                        description={description} 
                        authorID={creator._id}
                        authorName={creator.name} 
                        authorAvatar={creator.avatar}
                        createdAt={createdAt} 
                    />
                </div>
            ))}
        </div>
    ) : (
        <h2 className='center'>No posts found</h2>
    )}
    </section>
  );
};
