import React from 'react';
import { Divider } from 'antd';
import CreateRealEstateForm from 'forms/CreateRealEstateForm/CreateRealEstateForm';

const UserRealEstateCreatePage = () => {
  return (
    <section>
      <h2>Đăng tin bất động sản</h2>
      <Divider />
      <CreateRealEstateForm />
    </section>
  )
}

export default UserRealEstateCreatePage;