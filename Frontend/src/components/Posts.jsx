import React, { useState } from 'react';

import { DUMMY_POSTS } from '../data';
import PostItem from './PostItem';

const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    
    return (
        <section className="posts">
          {posts.length > 0 ? <div className="container posts__container">
              {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
                  <div key={id} className="post">
                      <PostItem postID={id} thumbnail={thumbnail} category={category} title={title} description={desc} authorID={authorID} />
                  </div>
              )) }
          </div> : <h2 className='center'>No posts founds</h2>}
        </section>
    );
};

export default Posts;
