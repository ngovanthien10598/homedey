import React, { useState } from 'react';
import { Divider, Table, Button, Tooltip, Popconfirm, Modal, Form } from 'antd';
import { useEffect } from 'react';
import { getAllNewsCategoriesAPI } from 'services/user/news-category';
import { firstCapital } from 'utils/string';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import EditNewsCategoryForm from 'forms/EditNewsCategoryForm/EditNewsCategoryForm';

const { useForm } = Form;

const AdminNewsCategoryPage = props => {
  const [newsCategories, setNewsCategories] = useState(null);
  const [isLoadingNewsCategories, setLoadingNewsCategories] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [createForm, editForm] = useForm();
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

  const handleCreate = values => {
    console.log(values);
    const id = new Date().getTime();
    const name = values.name;
    const newItem = { id, name };
    const newState = [...newsCategories];
    newState.unshift(newItem);
    setNewsCategories(newState);
    setShowCreateModal(false);
  }

  const handleEditClick = category => {
    setSelectedCategory(category);
    setShowEditModal(true);
  }

  const handleEdit = values => {
    const id = selectedCategory.id;
    const newName = values.name;
    const newState = [...newsCategories];
    const index = newState.findIndex(cat => cat.id === id);
    newState[index].name = newName;
    setNewsCategories(newState);
    setShowEditModal(false);
    setSelectedCategory(null);
    editForm.resetFields();
  }

  const handleDelete = id => {
    const newState = [...newsCategories];
    const index = newsCategories.findIndex(cat => cat.id === id);
    newState.splice(index, 1);
    setNewsCategories(newState);
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
        destroyOnClose={true}
        forceRender={true}
        visible={showEditModal}
        afterClose={handleModalClose}
        onOk={() => editForm.validateFields().then(values => {
          editForm.resetFields();
          handleEdit(values);
        })}
        onCancel={() => setShowEditModal(false)}>
        <EditNewsCategoryForm form={editForm} onFinish={handleEdit} category={selectedCategory} />
      </Modal>
      <Modal
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