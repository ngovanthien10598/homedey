import React from 'react';
import LoginForm from 'forms/LoginForm/LoginForm';
import MainLayout from 'layouts/MainLayout/MainLayout';

const LoginPage = props => {
  return (
    <MainLayout>
      <div className="page-auth">
        <LoginForm />
      </div>
    </MainLayout>
  )
}

export default LoginPage;