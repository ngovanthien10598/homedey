import React from 'react';
import { Divider, Row, Col, Avatar, Empty } from 'antd';
import { useSelector } from 'react-redux';
import UserForm from 'forms/UserForm/UserForm';
import ChangePasswordForm from 'forms/ChangePasswordForm/ChangePasswordForm';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';

const UserHomePage = props => {
  const userState = useSelector(state => state.userState);
  const { user } = userState;
  return (
    <div>
      <h2>Thông tin tài khoản</h2>
      <Divider />
      {
        user ?
          <UserForm user={user} />
          :
          <Empty />
      }
      {
        user &&
        <ChangePasswordForm />
      }
    </div>
  )
}

export default UserHomePage;