import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';

export const EditPost = () => {
  const [blog, setBlog] = useState({
    title: '',
    catagory:'',
    thumbnail: '',
    description: ''
  });

  const navigate = useNavigate(); 
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.jwtToken;

  // Redirect to login page:
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);


  const InputOnChange = (property, value)=>{
    setBlog(preObj=>({
        ...preObj, 
        [property] : value
    }))
  }
  const modules = {
    toolbar : [
      [{'header' : [1, 2,3, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

    const POST_CATEGORIES = ["Programming", "System-Designe", "LeetCode", "Problem-Solving", "Operating-System", "DataBase", "Data-Structure", "Uncatergorized"]

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
          <p className="form__error-message">
            This is an error message
          </p>
          <form className="form create-post__from">
              <input onChange={(e)=>{InputOnChange("title", e.target.value)}} value={blog.title} type="text" placeholder = 'Title' />

              <select onChange={(e)=>{InputOnChange("catagory", e.target.value)}} value={blog.catagory}>
                        {
                          POST_CATEGORIES.map((cat => <option key={cat}>{cat}</option>))
                        }
                </select>
                <ReactQuill modules={modules} formats={formats} onChange={(e) => {InputOnChange("description", e.target.value)}} value={blog.description} />
                <input onChange={(e) => {InputOnChange("thumbnail", e.target.value)}} value={blog.thumbnail} accept='jpg, png, jpeg' type="file" />

                <button type="submit" className="btn primary">Update</button>
          </form>
      </div>
    </section>
  )
}
