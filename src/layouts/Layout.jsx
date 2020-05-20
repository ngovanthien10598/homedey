import React from 'react';
import Header from 'components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

const Layout = props => {
  return (
    <div className="layout">
      <BrowserRouter>
        <Header />
        {
          props.children
        }
      </BrowserRouter>
    </div>
  )
}

export default Layout;