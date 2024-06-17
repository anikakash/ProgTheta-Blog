import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ authorUserID, author, authorImg, createdAt }) => {
  // const [author, setAuthor] = useState();

  // useEffect(() => {
  //   const getAuthor = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile/${authorID}`);
  //       setAuthor(response?.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getAuthor();
  // }, []);

  return (
    <Link to={`/posts/user/${authorUserID}`} className="post__author">
      <div className="post__author-avatar">
        <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${authorImg}`} alt={author} />
      </div>
      <div className="post__author-details">
        <h5>{author}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} local='en-US'/></small>
      </div>
    </Link>
  );
};

export default PostAuthor;
