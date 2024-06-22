import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import PostItem from './PostItem';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async (page) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post?page=${page}&pageSize=6`);
            console.log('Response from API: ', response);
            const { posts, totalPage } = response?.data;
            setPosts(posts);
            setTotalPage(totalPage);
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

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
                                categoryId={category?._id || 'non'}
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
            {totalPage > 1 && (
                <div className='pagination__container'>
                    {currentPage > 1 && 
                        <button onClick={prevPage} className='btn primary'>Previous Page</button>
                    }
                    {currentPage < totalPage && 
                        <button onClick={nextPage} className='btn primary'>Next Page</button>
                    }
                    
                </div>
            )}
        </section>
    );
};

export default Posts;
