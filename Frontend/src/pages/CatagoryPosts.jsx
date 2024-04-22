import React, { useState } from 'react';
import { PostItem } from '../components/PostItem';
import { DUMMY_POSTS } from '../data';

export const CatagoryPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS)
  return (
    <section>
          {posts.length > 0 ? <div className="container category-posts__container">
              {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
                  <div key={id} className="post">
                      <PostItem postID={id} thumbnail={thumbnail} category={category} title={title} description={desc} authorID={authorID} />
                  </div>
              )) }
          </div> : <h2 className='center'>No posts founds</h2>}
        </section>
  )
}
