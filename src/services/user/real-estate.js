import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';

export function getAllRealEstate() {
  return axios.get(`${apiPrefix}/user/real-estate/`);
}

export function createRealEstate(token, body) {
  return axios.post(`${apiPrefix}/user/real-estate/listings/`, body, withAuthorization(token))
}



export function uploadImages(images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('images[]', image);
  })
  console.log(formData)
  return axios.post(`${apiPrefix}/user/real-estate/upload-image/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}