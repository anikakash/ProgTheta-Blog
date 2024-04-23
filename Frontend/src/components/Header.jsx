import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

export const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

  const closeNavHandler = () =>{
    if(window.innerHeight < 800){
      setIsNavShowing(false);
    }else{
      setIsNavShowing(true);
    }
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
          <img src={Logo} alt="Prog Theta"/>
        </Link>
        {
          isNavShowing && <ul className="nav__menu">
          <li><Link to='/profile/sdfsdf' onClick={closeNavHandler}>Anik Akash</Link></li>
          <li><Link to='/create-post' onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to='/logout' onClick={closeNavHandler}>Logut</Link></li>
        </ul>
        }

        <button className="nav__toggle-btn" onClick = {() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
        </button>
        

      </div>
    </nav>
  )
}
