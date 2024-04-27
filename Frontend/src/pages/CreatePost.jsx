import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

export const CreatePost = () => {
  const [blog, setBlog] = useState({
    title: '',
    category: 'LeetCode',
    thumbnail: null, // Change to null
    description: ''
  });

  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const inputOnChange = (property, value) => {
    setBlog(prevObj => ({
      ...prevObj,
      [property]: value
    }));
  };

  const POST_CATEGORIES = ["LeetCode", "System-Design", "Problem-Solving", "Database", "Data-Structure", "AI", "Uncategorized"];

  const createPost = async (e) => {
    e.preventDefault();
    // console.log(blog);

    const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('category', blog.category);
      formData.append('description', blog.description);
      formData.append('thumbnail', blog.thumbnail); // Append thumbnail file

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/post/create-post`, formData, {
        withCredentials: true,
        headers: { authorization: `${currentUser?.jwtToken}`}});

      if(response.status === 201){
        return navigate('/');
      }
    } catch (err) {
      // console.log(err);
      setError(err.response.data.message);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog(prevObj => ({
      ...prevObj,
      thumbnail: file
    }));
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">
          {error}
        </p>}
        <form onSubmit={createPost} className="form create-post__from">
          <input onChange={(e) => { inputOnChange("title", e.target.value) }} value={blog.title} type="text" placeholder='Title' />

          <select onChange={(e) => { inputOnChange("category", e.target.value) }} value={blog.category}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>

          <ReactQuill
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                ['clean']
              ]
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image'
            ]}
            onChange={(value) => inputOnChange("description", value)}
            value={blog.description}
          />

          <input onChange={handleFileChange} accept="image/*" type="file" /> {/* Change here */}

          <button type="submit" className="btn primary">Create</button>
        </form>
      </div>
    </section>
  );
};
