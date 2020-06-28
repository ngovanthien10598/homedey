import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Tooltip, Popconfirm, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllNewsAPI } from 'services/user/news';
import CreateNewsForm from 'forms/CreateNewsForm/CreateNewsForm';
import UploadPictures from 'components/UploadPictures/UploadPictures';
import { uploadNewsImage, createNewsAPI, updateNewsAPI, deleteNewsAPI } from 'services/admin/news';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import EditNewsForm from 'forms/EditNewsForm/EditNewsForm';

const { useForm } = Form;

const AdminNewsPage = props => {
  const [news, setNews] = useState(null);
  const [isLoadingNews, setLoadingNews] = useState(null);
  const [isModalShow, setModalState] = useState(false);
  const [createForm] = useForm();
  const [editForm] = useForm();
  const [action, setAction] = useState('');
  const [imageList, setImageList] = useState([]);
  const accessToken = Cookies.get('access');
  const [isLoading, setIsLoading] = useState(false);
  const [image_ids, setImages_ids] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const tableColumns = [
    { title: '#', render: (text, record, index) => (index + 1) },
    { title: 'Tiêu đề', dataIndex: 'title', render: (text, record) => <Link to={`/news/${record.slug}`}>{record.title}</Link> },
    { title: 'Loại', dataIndex: 'news_category.name', render: (text, record) => record.news_category.name },
    { title: 'Ngày đăng', dataIndex: 'created_at', render: (text, record) => new Date(record.created_at).toLocaleDateString('vi-VN') },
    {
      title: 'Hành động', key: 'action', render: (_, record) => {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick(record)} />
            </Tooltip>
            <Tooltip title="Xóa">
              <Popconfirm title="Bạn có chắc muốn xóa tin này" onConfirm={() => handleDelete(record.id)}>
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
      let image_ids_uploaded;
      if (!image_ids) {
        const response = await uploadNewsImage(accessToken, imageList.map(image => image.originFileObj));
        image_ids_uploaded = response.data.image_ids;
        setImages_ids(image_ids_uploaded);
      }
      const newsBody = {
        title: values.title,
        content: values.content,
        news_category_id: values.news_category_id,
        image_ids: image_ids_uploaded
      }
      const createResponse = await createNewsAPI(accessToken, newsBody);
      const newState = { ...news };
      newState.results = [...news.results];
      newState.results.unshift(createResponse.data.data);
      setNews(newState);
      setImages_ids(null);
      setModalState(false);
      setImageList(null);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const handleEditClick = news => {
    setModalState(true);
    setSelectedNews(news);
    setAction('edit');
    setImageList(news.images.map(image => {
      return {
        ...image,
        uid: image.id
      }
    }))
  }

  const handleEdit = async values => {
    setIsLoading(true);
    try {
      let image_ids_uploaded = [];
      const old_images_ids = selectedNews.images.map(image => image.id);
      if (!image_ids) {
        const new_images = imageList.filter(image => image.originFileObj).map(image => image.originFileObj);
        if (new_images.length > 0) {
          const response = await uploadNewsImage(accessToken, new_images);
          image_ids_uploaded = response.data.image_ids;
          setImages_ids(image_ids_uploaded);
        }
      }
      const newsBody = {
        title: values.title,
        content: values.content,
        news_category_id: values.news_category_id,
        image_ids: [...old_images_ids, ...image_ids_uploaded]
      }
      const updateResponse = await updateNewsAPI(accessToken, selectedNews.id, newsBody);
      const updatedNews = updateResponse.data.data;
      const newState = { ...news };
      const index = newState.results.findIndex(n => n.id === selectedNews.id);
      newState.results = [...news.results];
      newState.results[index] = updatedNews;
      setNews(newState)
      setImages_ids(null);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setModalState(false);
  }

  const handleDelete = async id => {
    try {
      await deleteNewsAPI(accessToken, id);
      const newState = { ...news };
      const index = newState.results.findIndex(n => n.id === id);
      newState.results = [...news.results];
      newState.results.splice(index, 1);
      setNews(newState);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBeforeUpload = file => {
    setImageList([...imageList, file]);
    return false;
  }

  const handleOK = () => {
    if (action === 'create') {
      createForm.validateFields().then(values => {
        handleCreate(values);
      });
    }

    if (action === 'edit') {
      editForm.validateFields().then(values => {
        handleEdit(values);
      })
    }
  }

  const onAfterModalClose = () => {
    editForm.resetFields();
    createForm.resetFields();
    setSelectedNews(null);
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
        afterClose={onAfterModalClose}
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
              beforeUpload={handleBeforeUpload} />
          </div>
        }

        {
          action === 'edit' &&
          <div>
            <EditNewsForm onFinish={handleEdit} news={selectedNews} form={editForm} />
            <UploadPictures
              onChange={onUploadChange}
              fileList={imageList}
              beforeUpload={handleBeforeUpload} />
          </div>
        }
      </Modal>
    </div>
  )
}

export default AdminNewsPage;