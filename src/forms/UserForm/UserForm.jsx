import React, { useState } from 'react';
import { Form, Avatar, Input, Row, Col, Button, DatePicker } from 'antd';
import UploadPictures from 'components/UploadPictures/UploadPictures';
import Cookies from 'js-cookie';
import { updateProfileAPI, updateAvatarAPI } from 'services/user/profile';

const { Item } = Form;

const UserForm = props => {
  const { user } = props;
  const [imageList, setImageList] = useState([]);
  const accessToken = Cookies.get('access');
  const [isLoading, setIsLoading] = useState(false);

  const handleBeforeUpload = file => {
    setImageList([...imageList, file]);
    return false;
  }

  const handleUploadChange = ({ fileList }) => {
    setImageList([...fileList]);
  }

  const onFinish = async values => {
    values.DOB = new Date(values.DOB).toISOString().substr(0, 10);
    setIsLoading(true);
    try {
      if (imageList.length > 0) {
        const file = imageList[0].originFileObj;
        await updateAvatarAPI(accessToken, file);
      }
      await updateProfileAPI(accessToken, values);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form
      style={{ maxWidth: 600 }}
      layout="vertical"
      onFinish={onFinish}>
      <Row gutter="15">
        <Col>
          <Avatar size="large" src={user.avatar}>{user.first_name.charAt(0)}</Avatar>
        </Col>
        <Col>
          <UploadPictures
            fileList={imageList}
            length={1}
            onChange={handleUploadChange}
            beforeUpload={handleBeforeUpload} />
        </Col>
      </Row>

      <Row gutter="15">
        <Col flex="1">
          <Item label="Họ" name="first_name" initialValue={user.first_name}>
            <Input />
          </Item>
        </Col>
        <Col flex="1">
          <Item label="Tên" name="last_name" initialValue={user.last_name}>
            <Input />
          </Item>
        </Col>
      </Row>

      <Item label="Email" name="email" initialValue={user.email}>
        <Input readOnly />
      </Item>

      <Item label="Điện thoại" name="phone" initialValue={user.phone}>
        <Input />
      </Item>

      <Item label="Ngày sinh" name="DOB" initialValue={user.DOB}>
        <Input />
      </Item>

      <Item>
        <Button loading={isLoading} disabled={isLoading} htmlType="submit">Cập nhật</Button>
      </Item>

    </Form >
  )
}

export default UserForm;