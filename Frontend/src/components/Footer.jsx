import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li> <Link to="/posts/categories/system-design"> System Design </Link></li>
        <li> <Link to="/posts/categories/problem-solving"> Problem Solving </Link></li>
        <li> <Link to="/posts/categories/robotices1"> Robotics </Link></li>
        <li> <Link to="/posts/categories/robotices2"> Robotics2 </Link></li>
        <li> <Link to="/posts/categories/robotices3"> Robotics3 </Link></li>
        <li> <Link to="/posts/categories/robotices4"> Robotics4 </Link></li>
        <li> <Link to="/posts/categories/robotices5"> Robotics5 </Link></li>
        <li> <Link to="/posts/categories/robotices6"> Robotics6 </Link></li>
      </ul>

      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Prog Theta Team.</small>
      </div>
    </footer>
  )
}
