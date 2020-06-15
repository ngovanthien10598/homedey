import React from 'react';
import { useState } from 'react';

import './UploadPreview.scss';

const UploadPreview = props => {
  const { file } = props;
  const [base64, setBase64] = useState('');

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setBase64(reader.result);
  }
  return (
    <div className="upload-preview">
      <img className="upload-preview_img" src={base64} alt="" />
    </div>
  )
}

export default UploadPreview;