import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import './UploadPictures.scss';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const UploadPictures = props => {
  const [previewVisible, setPreviewVisible] = useState(props.previewVisible || false);
  const [previewImage, setPreviewImage] = useState(props.previewImage || '');
  const [previewTitle, setPreviewTitle] = useState(props.previewTitle || '');

  const handleCancel = () => {
    setPreviewVisible(false);
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle("Xem trước ảnh");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload
        listType="picture-card"
        fileList={props.fileList}
        onPreview={handlePreview}
        onChange={props.onChange}
        disabled={props.disabled}
        beforeUpload={props.beforeUpload}>
        {uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img src={previewImage} alt="" />
      </Modal>
    </div>
  )
}

export default UploadPictures;