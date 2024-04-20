import React from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

export const Header = () => {
  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className='nav_logo'>
          <img src={Logo} alt="Prog Theta"/>
        </Link>
        <ul className="nav__menu">
          <li><Link to='/profile/:id'>Anik Akash</Link></li>
          <li><Link to='/create-post'>Create Post</Link></li>
          <li><Link to='/authors'>Authors</Link></li>
          <li><Link to='/logout'>Logut</Link></li>
        </ul>

        <button className="nav__toggle-btn">
          <AiOutlineClose/>
        </button>

      </div>
    </nav>
  )
}
