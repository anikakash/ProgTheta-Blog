import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreatePost = () => {
  const [blog, setBlog] = useState({
    title: '',
    category:'',
    thumbnail: '',
    description: ''
  });
  const inputOnChange  = (property, value)=>{
    setBlog(preObj=>({
        ...preObj, 
        [property] : value
    }))
  }
  // const modules = {
  //   toolbar : [
  //     [{'header' : [1, 2,3, false]}],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}],
  //     ['link', 'image'],
  //     ['clean']
  //   ],
  // }

  // const formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ]

    const POST_CATEGORIES = ["Programming", "System-Designe", "LeetCode", "Problem-Solving", "Operating-System", "DataBase", "Data-Structure", "Uncatergorized"]

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
          <p className="form__error-message">
            This is an error message
          </p>
          <form className="form create-post__from">
              <input onChange={(e)=>{inputOnChange ("title", e.target.value)}} value={blog.title} type="text" placeholder = 'Title' />

              <select onChange={(e)=>{inputOnChange ("category", e.target.value)}} value={blog.category}>
                        {
                          POST_CATEGORIES.map((cat => <option key={cat}>{cat}</option>))
                        }
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


                <input onChange={(e) => {inputOnChange ("thumbnail", e.target.value)}} value={blog.thumbnail} accept="image/*" type="file" />

                <button type="submit" className="btn primary">Create</button>
          </form>
      </div>
    </section>
  )
}
