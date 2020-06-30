import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Input, Divider, Button, Alert } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import AuthForm from 'containers/AuthForm/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from 'store/actions/user.action';
import { useEffect } from 'react';

const LoginForm = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const userState = useSelector(state => state.userState);

  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const next = searchParams.get('next');

  const handleLogin = async values => {
    setLoading(true);
    try {
      const body = values;
      await dispatch(loginAction(body));
    } catch (error) {
      console.log({ error });
    }
    setLoading(false);
  }

  useEffect(() => {
    const { user, accessToken } = userState;
    if (user && accessToken) {
      localStorage.setItem('user', user.first_name + ' ' + user.last_name);
      if (search.length > 0) {
        if (next.length > 0) {
          history.replace(next);
        }
      } else {
        history.replace('/');
      }
    }
  });

  return (
    <AuthForm>
      {
        next?.length > 0 &&
          <>
            <Alert message="Vui lòng đăng nhập để tiếp tục" type="error" />
            <br />
          </>
      }
      <h2>Đăng nhập</h2>
      <Divider />
      <Form layout="vertical" onFinish={handleLogin} noValidate>
        <Form.Item label="Địa chỉ email" htmlFor="email" name="email" rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' }
        ]}>
          <Input id="email" type="email" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item label="Mật khẩu" htmlFor="password" name="password" rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' }
        ]}>
          <Input.Password id="password" prefix={<KeyOutlined />} />
        </Form.Item>

        <p><Link to="/forgot-password">Quên mật khẩu</Link></p>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block>Đăng nhập</Button>
        </Form.Item>
        <p className="text-center">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </Form>
    </AuthForm>
  )
}

export default LoginForm;