import React, { useState, useEffect } from 'react';
import { Divider, Table, Tag, Button } from 'antd';
// import AdminLayout from 'layouts/AdminLayout/AdminLayout';
import { getAllUsersAPI, blockUserAPI, unblockUserAPI } from 'services/admin/user';
import Cookies from 'js-cookie';
import { CheckCircleFilled, LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const AdminUserPage = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const accessToken = Cookies.get('access');
  const userState = useSelector(state => state.userState);

  const tableColumns = [
    { title: '#', key: '#', render: (text, record, index) => (index + 1) },
    { title: 'Họ', dataIndex: 'first_name' },
    { title: 'Tên', dataIndex: 'last_name' },
    { title: 'Địa chỉ email', dataIndex: 'email' },
    {
      title: 'Trạng thái', dataIndex: 'is_active', render: (_, { is_active }) => {
        return is_active ?
          <Tag color="success">Hoạt động</Tag>
          :
          <Tag color="error">Bị khóa</Tag>
      }
    },
    {
      title: 'Admin', dataIndex: 'is_active', render: (_, { is_staff }) => {
        return is_staff ?
          <CheckCircleFilled />
          :
          null
      }
    },
    {
      title: 'Hành động', key: 'action', render: (text, { id, is_active }) => {
        return is_active ?
          <Button danger onClick={() => blockUser(id)} type="link">Khóa</Button>
          :
          <Button onClick={() => unblockUser(id)} type="link">Mở khóa</Button>
      }
    }
  ]

  async function getAllUsers(page) {
    setIsLoading(true);
    try {
      const response = await getAllUsersAPI(accessToken, page);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const blockUser = async id => {
    setIsLoading(true);
    try {
      await blockUserAPI(accessToken, id);
      getAllUsers();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const unblockUser = async id => {
    setIsLoading(true);
    try {
      await unblockUserAPI(accessToken, id);
      getAllUsers();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers(1);
  }, []);

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <Divider />
      <Table
        rowKey="id"
        loading={isLoading}
        columns={tableColumns}
        dataSource={users?.results.filter(user => user.id !== userState.user?.id)}
        pagination={{ total: (users?.count - 1), onChange: page => getAllUsers(page) }} />
    </div>
  )
}

export default AdminUserPage;