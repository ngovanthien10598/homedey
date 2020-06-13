import React from 'react';
import RegisterForm from 'forms/RegisterForm/RegisterForm';
import MainLayout from 'layouts/MainLayout/MainLayout';

const RegisterPage = props => {
  return (
    <MainLayout>
      <div className="page-auth">
        <RegisterForm />
      </div>
    </MainLayout>
  )
}

export default RegisterPage;