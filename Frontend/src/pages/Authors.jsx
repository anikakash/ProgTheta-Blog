import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Avatar1 from '../assets/avatar1.jpg'
import { default as Avatar2, default as Avatar4 } from '../assets/avatar2.jpg'
import Avatar3 from '../assets/avatar3.jpg'


const authorsData = [
  {id: 1, avatar: Avatar1, name: "Prity Dash", posts: 3},
  {id: 2, avatar: Avatar2, name: "Anik Dash", posts: 5},
  {id: 3, avatar: Avatar3, name: "Ernest Achiever", posts: 3},
  {id: 4, avatar: Avatar4, name: "Nan Addo", posts: 0},
  {id: 5, avatar: Avatar2, name: "Akash Dash", posts: 3}
]

export const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="authors">
      { authors.length > 0 ? 
        <div className="container authors__container">
        {
          authors.map(({id, avatar, name, posts})=>{
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author__avatar">
                <img src={avatar} alt={`Image of ${name}`} />
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No users/authors found.</h2>
      }
    </section>
  )
}
