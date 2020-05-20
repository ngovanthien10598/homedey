import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './HeaderContent.scss';

const HeaderContent = props => {
  return (
    <div className="header_content d-flex flex-row align-items-center justify-content-start">
      <div><Link to="/" className="logo">my<span>home</span></Link></div>
      <nav className="main_nav">
        <ul className="d-flex flex-row align-items-start justify-content-start">
          <li><NavLink to="/" exact>Home</NavLink></li>
          <li><NavLink to="/about">About us</NavLink></li>
          <li><NavLink to="/listings">Listings</NavLink></li>
          <li><NavLink to="/news">News</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
      <div className="submit ml-auto"><Link to="/">submit listing</Link></div>
      <div className="hamburger ml-auto">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  )
}

export default HeaderContent;