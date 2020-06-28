import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import Quill from 'react-quill';
import { getAllNewsCategoriesAPI } from 'services/user/news-category';

const { Option } = Select;

const EditNewsForm = props => {

  const news = props.news;
  console.log(news);

  const [content, setContent] = useState('');
  const [newsCategories, setNewsCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getNewsCategories() {
    setIsLoading(true);
    try {
      const response = await getAllNewsCategoriesAPI();
      setNewsCategories(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getNewsCategories();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        news={props.news}>
        <Form.Item label="Tiêu đề" name="title" initialValue={news.title} rules={[
          { required: true, message: 'Vui lòng nhập tiêu đề' }
        ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Nội dung" name="content" initialValue={news.content} rules={[
          { required: true, message: 'Vui lòng nhập nội dung' }
        ]}>
          <Quill value={content} onChange={setContent} />
        </Form.Item>

        <Form.Item label="Loại tin" name="news_category_id" initialValue={news.news_category.id} rules={[
          { required: true, message: "Vui lòng chọn loại tin" }
        ]}>
          <Select loading={isLoading}>
            {
              newsCategories &&
              newsCategories.map(c => {
                return <Option value={c.id} key={c.id}>{c.name}</Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>

    </div>
  )
}

export default EditNewsForm;