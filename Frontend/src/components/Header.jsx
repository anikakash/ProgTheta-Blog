import React, { useContext, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { UserContext } from '../context/user.Context'

export const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

  const {currentUser} = useContext(UserContext);

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
          currentUser?.tokenObject?.id  && isNavShowing && <ul className="nav__menu">
          <li><Link to={`/profile/${currentUser?.tokenObject?.id}`} onClick={closeNavHandler}>{currentUser?.tokenObject?.Name}</Link></li>
          <li><Link to='/create-post' onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to='/logout' onClick={closeNavHandler}>Logut</Link></li>
        </ul>
        }

        {
          !currentUser?.tokenObject?.id && isNavShowing && <ul className="nav__menu">
          <li><Link to='/authors' onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to='/login' onClick={closeNavHandler}>Login</Link></li>
        </ul>
        }

        <button className="nav__toggle-btn" onClick = {() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
        </button>
        

      </div>
    </nav>
  )
}
