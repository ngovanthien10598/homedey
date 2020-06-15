import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import './UploadButton.scss';

const UploadButton = props => {
  return (
    <label className="upload-btn">
      <PlusOutlined />
      <input className="upload-btn_input" ref={props.inputRef} type="file" accept="image/*" multiple onChange={props.onChange} />
      <div className="upload-btn_text">Chọn ảnh</div>
    </label>
  )
}

export default UploadButton;