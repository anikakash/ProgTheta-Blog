import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user.Context';

export const EditPost = () => {

  const POST_CATEGORIES = ["LeetCode", "System-Design", "Problem-Solving", "Database", "Data-Structure", "AI", "Uncategorized"];

  const [blog, setBlog] = useState({
    title: '',
    category: '', // Correct spelling
    thumbnail: '', // Add a placeholder for thumbnail
    description: ''
  });

  const navigate = useNavigate(); 
  const { id } = useParams();

  const [error, setError] = useState(""); // Correct syntax for useState

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const InputOnChange = (property, value) => {
    setBlog(prevObj => ({
      ...prevObj, 
      [property]: value
    }));
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  useEffect(() => {
    const getPost = async () => {
      try {

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`);

        // console.log("API Response:", response.data);

        setBlog(prevBlog => ({
          ...prevBlog,
          title: response.data.title,
          category: response.data.category, // Set category
          description: response.data.description,
        }));

      } catch (err) {
        console.log(err);
        setError("Failed to fetch post data.");
      }
    }
    getPost();
  }, [id]);

  const editPost = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('category', blog.category);
      formData.append('description', blog.description);
      formData.append('thumbnail', blog.thumbnail); // Append thumbnail file

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/post/update-post/${id}`, formData, {
        withCredentials: true,
        headers: { authorization: `${currentUser?.jwtToken}` },
      });

      if(response.status === 200){
        return navigate('/');
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">
          {error} 
        </p>}
        <form onSubmit={editPost} className="form create-post__from">
          <input onChange={(e) => InputOnChange("title", e.target.value)} value={blog.title} type="text" placeholder="Title" />

          <select onChange={(e) => InputOnChange("category", e.target.value)} value={blog.category}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>

          <ReactQuill modules={modules} formats={formats} onChange={(value) => InputOnChange("description", value)} value={blog.description} />
          
          {/* Handle file input separately for thumbnail */}
          <input onChange={(e) => InputOnChange("thumbnail", e.target.files[0])} accept="image/*" type="file" />

          <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  )
}
