import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Input, Divider, Button } from 'antd';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import AuthForm from 'containers/AuthForm/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from 'store/actions/user.action';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const LoginForm = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const [, setCookie] = useCookies(['token']);
  const userState = useSelector(state => state.userState);

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
    const { user, token } = userState;
    if (user && token) {
      setCookie('token', token, { maxAge: 7 * 24 * 3600 });
      localStorage.setItem('user', user.first_name + ' ' + user.last_name);
      const search = location.search;
      if (search.length > 0) {
        const searchParams = new URLSearchParams(search);
        const next = searchParams.get('next');
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

        <p><Link to="/quen-mat-khau">Quên mật khẩu</Link></p>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block>Đăng nhập</Button>
        </Form.Item>
        <p className="text-center">Chưa có tài khoản? <Link to="/dang-ky">Đăng ký</Link></p>
      </Form>
    </AuthForm>
  )
}

export default LoginForm;