import React from 'react';
import { Form, Input } from 'antd';

const CreateNewsCategoryForm = props => {
  return (
    <Form form={props.form} layout="vertical" onFinish={props.onFinish}>
      <Form.Item label="Tên loại tin" name="name" rules={[
        {required: true, message: "Vui lòng nhập tên"}
      ]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default CreateNewsCategoryForm;