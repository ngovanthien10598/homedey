import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const withUserRoute = Component => {
  return function Wrapper(props) {
    const location = useLocation();
    const accessToken = Cookies.get('access');

    if (!accessToken || accessToken.length === 0) {
      return <Redirect to={`/login?next=${location.pathname}`} />
    } else {
      return <Component {...props} />
    }
  }
}

export default withUserRoute;