import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Cookies from 'js-cookie';
import { changePasswordAPI } from 'services/auth/user';

const { Item, useForm } = Form;

const ChangePasswordForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const accessToken = Cookies.get('access');


  const handleChangePassword = async values => {
    setIsLoading(true);
    try {
      await changePasswordAPI(accessToken, values);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form
      form={form}
      style={{maxWidth: 600}}
      layout="vertical"
      onFinish={handleChangePassword}>
      <div><strong>Đổi mật khẩu</strong></div>
      <Item label="Mật khẩu cũ" name="old_password" required>
        <Input.Password />
      </Item>
      <Item label="Mật khẩu mới" name="new_password" required>
        <Input.Password />
      </Item>
      <Item label="Nhập lại mật khẩu mới" name="confirm_password" required>
        <Input.Password />
      </Item>
      <Item>
        <Button loading={isLoading} disabled={isLoading} htmlType="submit">Đổi mật khẩu</Button>
      </Item>
    </Form>
  )
}

export default ChangePasswordForm;