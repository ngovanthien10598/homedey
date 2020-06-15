import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { notification } from 'antd';
import { useEffect } from 'react';

const withAdminRoute = Component => {
  return function Wrapper(props) {
    const location = useLocation();
    const userState = useSelector(state => state.userState);
    const { user } = userState;

    useEffect(() => {
      if (user && !user.is_staff) {
        notification.error({
          message: 'Lỗi',
          description: 'Bạn không có quyền truy cập vào trang này',
        })
      }
    })

    if (!user) {
      return <Redirect to={`/login?next=${location.pathname}`} />
    } else {
      if (!user.is_staff) {
        return <Redirect to="/" />
      } else {
        return <Component {...props} />
      }
    }
  }
}

export default withAdminRoute;