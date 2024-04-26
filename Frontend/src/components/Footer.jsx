import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li> <Link to="/posts/categories/System-Design"> System Design </Link></li>
        <li> <Link to="/posts/categories/LeetCode"> LeetCode </Link></li>
        <li> <Link to="/posts/categories/Database"> Database </Link></li>
      </ul>

      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Prog Theta Team.</small>
      </div>
    </footer>
  )
}
