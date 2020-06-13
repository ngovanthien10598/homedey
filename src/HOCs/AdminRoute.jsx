import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { notification } from 'antd';

const withAdminRoute = Component => {
  return function Wrapper(props) {
    const userState = useSelector(state => state.userState);
    const { user } = userState;
    const location = useLocation();

    if (!user) {
      return <Redirect to={`/dang-nhap?next=${location.pathname}`} />
    } else {
      if (!user.is_staff) {
        notification.error({
          message: 'Lỗi',
          description: 'Bạn không có quyền truy cập vào trang này',
        })
        return <Redirect to="/" />
      } else {
        return <Component {...props} />
      }
    }
  }
}

export default withAdminRoute;