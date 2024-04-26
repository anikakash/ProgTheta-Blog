import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';


export const PostItem = ({postID, category, title, description, authorID, thumbnail, createdAt}) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;

    const postTitle = title.length > 145 ? title.substr(0, 30) + '...' : title;
  return (
    <article className="posts">
        <div className="post__thumbnail">
        <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
        </div>

        <div className="post__content">
            <Link to={`/post/${postID}`}>
                <h3>{postTitle}</h3>
            </Link>
            <p dangerouslySetInnerHTML={{__html: shortDescription}}/>

            <div className="post__footer">
                <PostAuthor authorID={authorID} createdAt={createdAt}/>
                <Link to={`/posts/categories/${category}`}className="btn category">{category}</Link>
            </div>
        </div>

    </article>
  );
};

export default PostItem;

