import React from 'react';
import HeaderBar from './HeaderBar/HeaderBar';

import './Header.scss';
import HeaderContent from './HeaderContent/HeaderContent';

const Header = props => {
  return (
    <header className="header">
      <HeaderBar />
      <HeaderContent />
    </header>
  )
}

export default Header;