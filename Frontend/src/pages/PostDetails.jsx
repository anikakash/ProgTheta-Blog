import React from 'react'
import PostAuthor from '../components/PostAuthor'

const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor/>
            <div className="post-detail_buttons">
                
            </div>
          </div>
      </div>
    </section>
  )
}

export default PostDetails