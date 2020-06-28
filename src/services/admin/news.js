import axios from 'axios';
import apiPrefix, { withAuthorization } from '../apiPrefix';
const endpointPrefix = `${apiPrefix}/admin/news`;

export function createNewsAPI(token, body) {
  return axios.post(`${endpointPrefix}/`, body, withAuthorization(token));
}

export function uploadNewsImage(token, images) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append("images[]", image);
  });

  return axios.post(`${endpointPrefix}/upload-image/`, formData, withAuthorization(token));
}