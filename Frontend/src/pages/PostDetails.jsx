import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from '../components/PostAuthor'

export const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor/>
            <div className="post-detail_buttons">
              <Link to={`/posts/anik/edit`} className='btn sm primary'>Edit</Link>
              <Link to={`/posts/anik/delete`} className='btn sm danger'>Delete</Link>
            </div>
          </div>
          <h1>Ths is the post titel</h1>
      </div>
    </section>
  )
}

// export default PostDetails