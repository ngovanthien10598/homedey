import React from 'react';
import AuthForm from 'containers/AuthForm/AuthForm';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

const VerifyPage = props => {
  return (
    <div className="page-auth">
      <AuthForm>
        <h2>Xác thực tài khoản</h2>
        <Divider />
        <p>Tài khoản của bạn đã được kích hoạt, vui lòng <Link to="/dang-nhap">Đăng nhập</Link> để bắt đầu.</p>
      </AuthForm>
    </div>
  )
}

export default VerifyPage;