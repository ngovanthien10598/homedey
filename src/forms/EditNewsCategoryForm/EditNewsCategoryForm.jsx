import React from 'react';
import { Form, Input } from 'antd';

const EditNewsCategoryForm = props => {
  return (
    <Form form={props.form} layout="vertical" onFinish={props.onFinish}>
      <Form.Item label="Tên loại tin" name="name" initialValue={props.category?.name || null} rules={[
        {required: true, message: "Vui lòng nhập tên"}
      ]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default EditNewsCategoryForm;