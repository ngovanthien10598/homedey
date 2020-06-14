import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

const withUserRoute = Component => {
  return function Wrapper(props) {
    const location = useLocation();
    const userState = useSelector(state => state.userState);
    const { user } = userState;

    if (!user) {
      return <Redirect to={`/dang-nhap?next=${location.pathname}`} />
    } else {
      return <Component {...props} />
    }
  }
}

export default withUserRoute;