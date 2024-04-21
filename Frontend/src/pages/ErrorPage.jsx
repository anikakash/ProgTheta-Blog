import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImg from '../assets/notFound.jpg'

export const ErrorPage = () => {
  return (
    <section className='error-page'>
        <div className="center">
          <h2>Page Not Found</h2>
          <Link to="/" className='error__logo'>
            <img src={ErrorImg} alt="Prog Theta" className='error__img'/>
          </Link>
            <Link to='/' className='btn primary'> Go Back Home</Link>
        </div>
    </section>
  )
}
