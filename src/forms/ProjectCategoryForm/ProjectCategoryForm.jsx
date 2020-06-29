import React from 'react';
import { Form, Input } from 'antd';

const { Item } = Form;

const ProjectCategoryForm = props => {
  const category = props.category;
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}>
      <Item label="Tên loại" name="name" initialValue={category?.name} rules={[
        { required: true, message: 'Vui lòng nhập tên' }
      ]}>
        <Input />
      </Item>
    </Form>
  )
}

export default ProjectCategoryForm;