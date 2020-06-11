import React from 'react';

const AuthForm = props => {
  return (
    <div className="auth-form">
      {
        props.children
      }
    </div>
  )
}

export default AuthForm;