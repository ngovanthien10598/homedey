import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest, faFacebook, faTwitter, faDribbble, faBehance } from '@fortawesome/free-brands-svg-icons';

import './HeaderBar.scss';

const HeaderBar = () => {
  return (
    <div className="header_bar d-flex flex-row align-items-center justify-content-start">
      <div className="header_list">
        <ul className="contact d-flex flex-row align-items-center justify-content-start">

          <li className="d-flex flex-row align-items-center justify-content-start">
            <div><img src="images/phone-call.svg" alt="" /></div>
            <span>+546 990221 123</span>
          </li>

          <li className="d-flex flex-row align-items-center justify-content-start">
            <div><img src="images/placeholder.svg" alt="" /></div>
            <span>Main Str, no 23, New York</span>
          </li>

          <li className="d-flex flex-row align-items-center justify-content-start">
            <div><img src="images/envelope.svg" alt="" /></div>
            <span>hosting@contact.com</span>
          </li>
        </ul>
      </div>
      <div className="ml-auto d-flex flex-row align-items-center justify-content-start">
        <div className="social">
          <ul className="d-flex flex-row align-items-center justify-content-start">
            <li>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDribbble} />
              </a>
            </li>
            <li>
              <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faBehance} />
              </a>
            </li>
          </ul>
        </div>
        <div className="log_reg d-flex flex-row align-items-center justify-content-start">
          <ul className="d-flex flex-row align-items-start justify-content-start">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeaderBar;