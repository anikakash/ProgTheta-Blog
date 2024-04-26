import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';




export const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const getAuthors = async () =>{
      setIsLoading(true);
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/all`);
          setAuthors(response.data);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    }
    getAuthors();
  }, [])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="authors">
      { authors.length > 0 ? 
        <div className="container authors__container">
        {
          authors.map(({_id: id, avatar, name, posts})=>{
            return <Link key={id} to={`/posts/user/${id}`} className='author'>
              <div className="author__avatar">
                <img src={`${import.meta.env.VITE_API_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
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
