import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Divider, Button, Row, Col, notification } from 'antd';
import AuthForm from 'containers/AuthForm/AuthForm';

import { registerAPI } from 'services/auth/register';
import { useState } from 'react';

const RegisterForm = props => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async values => {
    setLoading(true);
    try {
      const registerRes = await registerAPI(values);
      notification.success({
        message: 'Đăng ký thành công',
        description: 'Vui lòng xác nhận tài khoản của bạn bằng email được gửi để đăng nhập.',
        duration: 2000,
        onClose: () => {
          history.replace('/dang-nhap');
        }
      })
      console.log(registerRes);
    } catch (error) {
    }
    setLoading(false);
  }

  return (
    <AuthForm>
      <h2>Đăng ký</h2>
      <Divider />
      <Form layout="vertical" onFinish={handleRegister} noValidate>
        <Row gutter={10} style={{ flexWrap: 'nowrap' }}>
          <Col>
            <Form.Item label="Họ" htmlFor="first-name" name="first_name" rules={[
              { required: true, message: 'Vui lòng nhập họ' }
            ]}>
              <Input id="first-name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Tên" htmlFor="last-name" name="last_name" rules={[
              { required: true, message: 'Vui lòng nhập tên' }
            ]}>
              <Input id="last-name" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Địa chỉ email" htmlFor="email" name="email" rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' }
        ]}>
          <Input id="email" type="email" />
        </Form.Item>
        <Form.Item label="Mật khẩu" htmlFor="password" name="password" rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
        ]} hasFeedback>
          <Input.Password id="password" />
        </Form.Item>
        <Form.Item label="Nhập lại mật khẩu" htmlFor="confirm-password" name="confirmPassword" rules={[
          { required: true, message: 'Vui lòng nhập lại mật khẩu' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Mật khẩu không khớp nhau');
            }
          })
        ]} hasFeedback>
          <Input.Password id="confirm-password" />
        </Form.Item>
        {/*
        <Form.Item label="Điện thoại" htmlFor="phone" name="phone" rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          { pattern: phoneValidationString, message: 'Số điện thoại không hợp lệ' }
        ]}>
          <Input id="phone" />
        </Form.Item>
        */}
        <Form.Item >
          <Button type="primary" loading={isLoading} htmlType="submit" block>Đăng ký</Button>
        </Form.Item>
        <p className="text-center">Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link></p>
      </Form>
    </AuthForm>
  )
}

export default RegisterForm;