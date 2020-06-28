import React, { useState } from 'react';
import { Divider, Table, Button, Tooltip, Popconfirm, Modal, Form } from 'antd';
import { useEffect } from 'react';
import { getAllNewsCategoriesAPI } from 'services/user/news-category';
import { firstCapital } from 'utils/string';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import EditNewsCategoryForm from 'forms/EditNewsCategoryForm/EditNewsCategoryForm';
import { createNewsCategoryAPI, updateNewsCategoryAPI, deleteNewsCategoryAPI } from 'services/admin/news-category';
import Cookies from 'js-cookie';
const { useForm } = Form;

const AdminNewsCategoryPage = props => {
  const [newsCategories, setNewsCategories] = useState(null);
  const [isLoadingNewsCategories, setLoadingNewsCategories] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm] = useForm();
  const [createForm] = useForm();
  const accessToken = Cookies.get('access');
  const tableColumns = [
    { title: '#', render: (text, record, index) => (index + 1) },
    { title: 'Tên', dataIndex: 'name', render: (_, record) => firstCapital(record.name) },
    {
      title: 'Hành động', key: 'action', render: (text, record) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => handleEditClick(record)} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm title="Bạn có chắc muốn xóa loại tin này" onConfirm={() => handleDelete(record.id)}>
                <Button
                  danger
                  type="link"
                  icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    }

  ]

  async function getNewsCategories() {
    setLoadingNewsCategories(true);
    try {
      const response = await getAllNewsCategoriesAPI();
      setNewsCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingNewsCategories(false);
  }

  const handleCreateClick = () => {
    setShowCreateModal(true);
  }

  const handleCreate = async values => {
    setIsLoading(true);
    try {
      const body = {
        name: values.name
      }
      const response = await createNewsCategoryAPI(accessToken, body);
      const newItem = response.data.data;
      const newState = [...newsCategories];
      newState.unshift(newItem);
      setNewsCategories(newState);
      setShowCreateModal(false);
    } catch (error) {
    }
    setIsLoading(false);
    createForm.resetFields();
  }

  const handleEditClick = category => {
    setSelectedCategory(category);
    setShowEditModal(true);
  }

  const handleEdit = async values => {
    setIsLoading(true);
    try {
      const id = selectedCategory.id;
      const body = {
        name: values.name
      }
      await updateNewsCategoryAPI(accessToken, id, body);
      const newState = [...newsCategories];
      const index = newState.findIndex(cat => cat.id === id);
      newState[index].name = values.name;
      setNewsCategories(newState);
      setShowEditModal(false);
      setSelectedCategory(null);
      editForm.resetFields();
    } catch (error) {

    }
    setIsLoading(false);

  }

  const handleDelete = async id => {
    try {
      await deleteNewsCategoryAPI(accessToken, id);
      const newState = [...newsCategories];
      const index = newsCategories.findIndex(cat => cat.id === id);
      newState.splice(index, 1);
      setNewsCategories(newState);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalClose = () => {
    editForm.resetFields();
    setSelectedCategory(null);
    setShowEditModal(false);
  }

  useEffect(() => {
    getNewsCategories();
  }, []);

  return (
    <div className="admin-news-page">
      <div style={{ display: 'flex' }}>
        <h2>Quản lý loại tin tức</h2>
        <Button style={{ marginLeft: 'auto' }} onClick={handleCreateClick}>
          <PlusOutlined /> Loại tin mới
        </Button>
      </div>
      <Divider />
      <Table
        rowKey="id"
        loading={isLoadingNewsCategories}
        dataSource={newsCategories}
        columns={tableColumns} />
      <Modal
        forceRender={true}
        destroyOnClose={true}
        visible={showEditModal}
        confirmLoading={isLoading}
        afterClose={handleModalClose}
        onOk={() => editForm.validateFields().then(values => {
          editForm.resetFields();
          handleEdit(values);
        })}
        onCancel={() => setShowEditModal(false)}>
        <EditNewsCategoryForm form={editForm} onFinish={handleEdit} category={selectedCategory} />
      </Modal>
      <Modal
        confirmLoading={isLoading}
        visible={showCreateModal}
        onOk={() => createForm.validateFields().then(values => {
          createForm.resetFields();
          handleCreate(values);
        })}
        onCancel={() => setShowCreateModal(false)}>
        <EditNewsCategoryForm form={createForm} onFinish={handleCreate} />
      </Modal>

    </div>
  )
}

export default AdminNewsCategoryPage;