import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Tooltip, Popconfirm, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllNewsAPI } from 'services/user/news';
import CreateNewsForm from 'forms/CreateNewsForm/CreateNewsForm';
import UploadPictures from 'components/UploadPictures/UploadPictures';
import { uploadNewsImage, createNewsAPI } from 'services/admin/news';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const { useForm } = Form;

const AdminNewsPage = props => {
  const [news, setNews] = useState(null);
  const [isLoadingNews, setLoadingNews] = useState(null);
  const [isModalShow, setModalState] = useState(false);
  const [createForm, editForm] = useForm();
  const [action, setAction] = useState('');
  const [imageList, setImageList] = useState([]);
  const accessToken = Cookies.get('access');
  const [isLoading, setIsLoading] = useState(false);
  const [image_ids, setImages_ids] = useState(null);

  const tableColumns = [
    { title: '#', render: (text, record, index) => (index + 1) },
    { title: 'Tiêu đề', dataIndex: 'title', render: (text, record) => <Link to={`/news/${record.slug}`}>{record.title}</Link> },
    { title: 'Ngày đăng', dataIndex: 'created_at', render: (text, record) => new Date(record.created_at).toLocaleDateString('vi-VN') },
    {
      title: 'Hành động', key: 'action', render: (_, record) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <Button type="link" icon={<EditOutlined />} onClick={handleEditClick} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm>
                <Button danger type="link" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </>
        )
      }
    }
  ]

  async function getAllNews() {
    setLoadingNews(true);
    try {
      const response = await getAllNewsAPI();
      setNews(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingNews(false);
  }

  const onUploadChange = ({ fileList }) => {
    setImageList([...fileList]);
  }

  const handleCreateClick = () => {
    setModalState(true);
    setAction('create');
  }

  const handleCreate = async values => {
    setIsLoading(true);
    try {
      if (!image_ids) {
        const response = await uploadNewsImage(accessToken, imageList.map(image => image.originFileObj));
        const image_ids = response.data.image_ids;
        setImages_ids(image_ids);
      }
      const newsBody = {
        title: values.title,
        content: values.content,
        news_category_id: values.news_category_id,
        image_ids: image_ids
      }
      const createResponse = await createNewsAPI(accessToken, newsBody);
      const newState = [...news];
      newState.unshift(createResponse.data.data);
      setNews(newState);
      setImages_ids(null);
      setModalState(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleEditClick = () => {
    setModalState(true);
  }

  const handleEdit = () => {

  }

  const handleDeleteClick = () => {

  }

  const handleDelete = () => {

  }

  const handleBeforeUpload = file => {
    setImageList([...imageList, file]);
    return false;
  }

  const handleRemoveImage = file => {

  }

  const handleOK = () => {
    if (action === 'create') {
      createForm.validateFields().then(values => {
        handleCreate(values);
      });
    }
  }

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <div className="admin-news-page">
      <div style={{ display: 'flex' }}>
        <h2>Quản lý tin tức</h2>
        <Button style={{ marginLeft: 'auto' }} onClick={handleCreateClick}>
          <PlusOutlined /> Bài viết mới
        </Button>
      </div>
      <Divider />
      <Table rowKey={'id'} loading={isLoadingNews} columns={tableColumns} dataSource={news?.results} />

      <Modal
        destroyOnClose={true}
        onOk={handleOK}
        onCancel={() => setModalState(false)}
        confirmLoading={isLoading}
        visible={isModalShow} width="80%">
        {
          action === 'create' &&
          <div>
            <CreateNewsForm onFinish={handleCreate} form={createForm} />
            <UploadPictures
              onChange={onUploadChange}
              fileList={imageList}
              beforeUpload={handleBeforeUpload}
              onRemove={handleRemoveImage} />
          </div>
        }

        {
          action === 'edit' &&
          <CreateNewsForm onFinish={handleEdit} form={editForm} />
        }
      </Modal>
    </div>
  )
}

export default AdminNewsPage;